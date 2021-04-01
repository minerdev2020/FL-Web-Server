const path = require('path');
const SocketIO = require('socket.io');
const CsvReader = require('./csvReader');
const Sensor = require('../models/sensor');

module.exports = (server) => {
  const io = SocketIO(server);

  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);

    const csvReader = new CsvReader();
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      csvReader.stop();
    });

    socket.on('error', (error) => {
      console.error(error);
    });

    socket.on('start', async (sensorId) => {
      console.log(sensorId, csvReader.isStop);

      const sensor = await Sensor.findOne({ where: { id: sensorId } });

      if (sensor) {
        csvReader.readline(
          path.join(__dirname, `../public/01_M01_${sensor.name}.csv`),
          (record) => {
            socket.emit('onReceived', record);
          }
        );
      }
    });
  });
};
