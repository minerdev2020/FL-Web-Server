import os
import select
import json
import joblib
import numpy as np
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

def printevaluate(y_true, y_pred):
    result = [accuracy_score(y_true, y_pred),
              precision_score(y_true, y_pred, average='macro'),
              recall_score(y_true, y_pred, average='macro'),
              f1_score(y_true, y_pred, average='macro')]
    print('accuracy, precision, recall, f1')
    print(result)
    return result

breakdown_report = {
    'type': 'warning',
    'breakdown_cause': 'create alert test', 
    'breakdown_id': 0, 
    'state_id': 1, 
    'type_id': 1
}

report = {
    'type': 'report',
    'status': 'running', 
}

breakdown_cause = ['normal', 'inner race', 'ball', 'outer race']

dir = os.path.dirname(os.path.realpath(__file__)).replace('\\', '/') + '/'
model = joblib.load(dir + './model.pkl')

IPC_FIFO_NAME_A = 'pipe_a'
IPC_FIFO_NAME_B = 'pipe_b'

def get_message(fifo):
    '''Read n bytes from pipe. Note: n=24 is an example'''
    return os.read(fifo, 8192)

def process_msg(msg):
    '''Process message read from pipe'''
    new_msg = ''
    json_data = json.loads(msg)
    
    if json_data['type'] == 'command' and json_data['command'] == 'exit':
        exit()
    
    x_data = np.array(json_data['data']['data'])
    print(x_data[:5], '...')
    print(x_data.shape)
    y_true = x_data[-1]
    x_data = x_data[:-1]
    
    y_pred = model.predict(x_data.reshape(1, -1))
    
    if y_pred > 0:
        breakdown_report['breakdown_id'] = json_data['data']['id']
        breakdown_report['breakdown_cause'] = breakdown_cause[int(y_pred)]
        new_msg = json.dumps(breakdown_report)
        
    else:
        new_msg = json.dumps(report)

    print('ture:', y_true, 'pred:', y_pred)
    return new_msg

if __name__ == '__main__':
    os.mkfifo(IPC_FIFO_NAME_A)  # Create Pipe A

    try:
        fifo_a = os.open(IPC_FIFO_NAME_A, os.O_RDONLY | os.O_NONBLOCK)  # pipe is opened as read only and in a non-blocking mode
        print('Pipe A ready')

        while True:
            try:
                fifo_b = os.open(IPC_FIFO_NAME_B, os.O_WRONLY)
                print('Pipe B ready')
                break
            except:
                # Wait until Pipe B has been initialized
                pass

        try:
            poll = select.poll()
            poll.register(fifo_a, select.POLLIN)

            try:
                while True:
                    if (fifo_a, select.POLLIN) in poll.poll(1000):  # Poll every 1 sec
                        msg = get_message(fifo_a)                   # Read from Pipe A
                        print('----- Received from JS -----')
                        print(len(msg.decode('utf-8')), 'bytes')
                        
                        new_msg = process_msg(msg)                  # Process Message
                        os.write(fifo_b, new_msg.encode())          # Write to Pipe B
            finally:
                poll.unregister(fifo_a)
        finally:
            os.close(fifo_a)
    finally:
        os.remove(IPC_FIFO_NAME_A)
        os.remove(IPC_FIFO_NAME_B)