const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { io } = require('socket.io-client');
const { Alert, AlertState, AlertType, Equipment } = require('../models');

const pathA = path.join(__dirname, '../python/pipe_a');
const pathB = path.join(__dirname, '../python/pipe_b');
const fifoB = spawn('mkfifo', [pathB]); // Create Pipe B

const socket = io(process.env.IIOT_IP, {
  transports: ['websocket'],
});

const sendAlert = async (alertsIo, data) => {
  try {
    const result = await Alert.create(data);
    const sendData = await Alert.findOne({
      include: [
        {
          model: AlertState,
          attributes: ['name'],
          as: 'state',
        },
        {
          model: AlertType,
          attributes: ['name'],
          as: 'type',
        },
        {
          model: Equipment,
          attributes: ['name', 'model_number'],
          as: 'breakdown_info',
        },
      ],
      where: { id: result.id },
    });
    alertsIo.of('/alerts').emit('create');
    alertsIo.emit('warning', sendData);
  } catch (err) {
    console.error(err);
  }
};

module.exports = (app) => {
  const interval = null;
  const timeRange = 1;
  const alertsIo = app.get('io');

  fifoB.on('exit', (status) => {
    console.log(`Created Pipe B. ${status}`);

    const fd = fs.openSync(pathB, 'r+');
    const fifoRs = fs.createReadStream(null, { fd });
    const fifoWs = fs.createWriteStream(pathA);

    console.log('Ready to write');

    fifoRs.on('data', (data) => {
      console.log('----- Received packet -----');
      console.log(new Date(), data.toString());

      const jsonData = JSON.parse(data.toString());
      if (jsonData.type === 'warning') {
        sendAlert(alertsIo, jsonData);
        console.log('Alert!!!');
      }
    });

    socket.on('disconnect', () => {
      console.log(new Date(), 'core io disconnect');
      fifoWs.write({ type: 'command', command: 'exit' });
      clearInterval(interval);
    });

    socket.on('coreUpdate', (data) => {
      console.log('-----   Send packet   -----');
      console.log(new Date(), data);
      fifoWs.write(JSON.stringify({ type: 'data', data }));
    });

    socket.emit('coreStart', {
      equipment_id: 1,
      time_range: timeRange,
    });
  });
};
