const SocketIO = require('socket.io');
const { Alert, AlertState, AlertType, Equipment } = require('../models');

module.exports = (server, app) => {
  const io = SocketIO(server);
  app.set('io', io);

  const sendAlert = async (data) => {
    try {
      console.log(data);
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
      io.of('/alerts').emit('create');
      io.emit('warning', sendData);
    } catch (err) {
      console.error(err);
    }
  };

  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('new client:', ip.split(':').pop(), socket.id);
    console.log('io connection');

    socket.on('disconnect', () => {
      console.log('io disconnect');
    });

    socket.on('send', () => {
      console.log('send');
      const test = {
        breakdown_cause: 'create alert test',
        breakdown_id: 1,
        state_id: 1,
        type_id: 1,
      };
      sendAlert(test);
    });
  });

  const alerts = io.of('/alerts');
  const persons = io.of('/persons');
  const equipments = io.of('/equipments');
  const sensors = io.of('/sensors');
  const requests = io.of('/requests');

  alerts.on('connection', (socket) => {
    console.log('alerts connection');
    socket.on('disconnect', () => {
      console.log('alerts disconnect');
    });
  });

  persons.on('connection', (socket) => {
    console.log('persons connection');
    socket.on('disconnect', () => {
      console.log('persons disconnect');
    });
  });

  equipments.on('connection', (socket) => {
    console.log('equipments connection');
    socket.on('disconnect', () => {
      console.log('equipments disconnect');
    });
  });

  sensors.on('connection', (socket) => {
    console.log('sensors connection');
    socket.on('disconnect', () => {
      console.log('sensors disconnect');
    });
  });

  requests.on('connection', (socket) => {
    console.log('requests connection');
    socket.on('disconnect', () => {
      console.log('requests disconnect');
    });
  });
};
