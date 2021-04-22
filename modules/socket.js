const path = require('path');
const SocketIO = require('socket.io');
const Sequelize = require('sequelize');

const Sensor = require('../models/sensor');
const CsvReader = require('./csvReader');

const env = process.env.NODE_ENV || 'sensor_data';
const config = require('../config/config')[env];

module.exports = (server) => {
  const io = SocketIO(server);
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );

  io.on('connection', async (socket) => {
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

    socket.on('onDateChanged', async (date) => {
      const dateJson = JSON.parse(date);
      console.log(dateJson);
      const query = `${dateJson.from ? `time >= ${dateJson.from}` : '1'} AND ${
        dateJson.to ? `time <= ${dateJson.to}` : '1'
      }`;
      console.log(query);
      const record = await sequelize.query(
        `SELECT * FROM sensor_data WHERE ${query} LIMIT 5`,
        { raw: true, type: sequelize.QueryTypes.SELECT }
      );
      console.log(record);
    });

    socket.on('start', async (sensorId) => {
      console.log(`sensor id: ${sensorId}`);
      const sensor = await Sensor.findOne({ where: { id: sensorId } });
      if (sensor) {
        csvReader.readline(
          path.join(__dirname, `../public/data/01_M01_${sensor.name}.csv`),
          (record) => {
            socket.emit('onReceived', record);
          }
        );
      }
    });
  });
};
