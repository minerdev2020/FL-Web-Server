const authRouter = require('./auth');
const logRouter = require('./log');

const alertRouter = require('./alert');
const personRouter = require('./person');
const equipmentRouter = require('./equipment');
const sensorRouter = require('./sensor');
const requestRouter = require('./request');
const taskRouter = require('./task');

module.exports = {
  authRouter,
  logRouter,
  alertRouter,
  personRouter,
  equipmentRouter,
  sensorRouter,
  requestRouter,
  taskRouter,
};
