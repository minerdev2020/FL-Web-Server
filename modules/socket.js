const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server);
  app.set('io', io);

  const persons = io.of('/persons');
  const equipments = io.of('/equipments');
  const sensors = io.of('/sensors');
  const messages = io.of('/messages');

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
