const SocketIO = require('socket.io');

module.exports = (server) => {
  const io = SocketIO(server);

  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on('error', (error) => {
      console.error(error);
    });
    socket.interval = setInterval(() => {
      console.log('onReceived', ip, socket.id, req.ip, 'Hello Socket.IO');
      socket.emit('onReceived', 'Hello Socket.IO');
    }, 3000);
  });
};
