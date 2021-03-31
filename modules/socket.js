const path = require('path');
const SocketIO = require('socket.io');
const csvReader = require('./csvReader');

module.exports = (server) => {
  const io = SocketIO(server);

  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);

    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      csvReader.isStop = true;
    });

    socket.on('error', (error) => {
      console.error(error);
    });

    socket.on('start', (sensorId) => {
      console.log(sensorId);

      csvReader.readline(
        path.join(__dirname, '../public/01_M01_IONGAUGEPRESSURE.csv'),
        (record) => {
          socket.emit('onReceived', record);
        }
      );
    });
  });
};
