const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server);
  app.set('io', io);

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
      io.emit('warning');
    });
  });

  const alerts = io.of('/alerts');
  const persons = io.of('/persons');
  const equipments = io.of('/equipments');
  const sensors = io.of('/sensors');
  const messages = io.of('/messages');

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

  messages.on('connection', (socket) => {
    console.log('messages connection');
    socket.on('disconnect', () => {
      console.log('messages disconnect');
    });
  });
};
