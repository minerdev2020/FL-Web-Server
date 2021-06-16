const Sequelize = require('sequelize');

const User = require('./user');

const Alert = require('./alert');
const AlertState = require('./alertState');
const AlertType = require('./alertType');

const Person = require('./person');
const PersonState = require('./personState');
const PersonType = require('./personType');

const Equipment = require('./equipment');
const EquipmentState = require('./equipmentState');
const EquipmentType = require('./equipmentType');

const Sensor = require('./sensor');
const SensorState = require('./sensorState');
const SensorType = require('./sensorType');

const Request = require('./request');
const RequestState = require('./requestState');
const RequestType = require('./requestType');

const Task = require('./task');
const TaskState = require('./taskState');
const TaskType = require('./taskType');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {
  sequelize,
  User,
  Alert,
  AlertState,
  AlertType,
  Person,
  PersonState,
  PersonType,
  Equipment,
  EquipmentState,
  EquipmentType,
  Sensor,
  SensorState,
  SensorType,
  Request,
  RequestState,
  RequestType,
  Task,
  TaskState,
  TaskType,
};

User.init(sequelize);
Alert.init(sequelize);
AlertState.init(sequelize);
AlertType.init(sequelize);
Person.init(sequelize);
PersonState.init(sequelize);
PersonType.init(sequelize);
Equipment.init(sequelize);
EquipmentState.init(sequelize);
EquipmentType.init(sequelize);
Sensor.init(sequelize);
SensorState.init(sequelize);
SensorType.init(sequelize);
Request.init(sequelize);
RequestState.init(sequelize);
RequestType.init(sequelize);
Task.init(sequelize);
TaskState.init(sequelize);
TaskType.init(sequelize);

User.associate(db);
Alert.associate(db);
AlertState.associate(db);
AlertType.associate(db);
Person.associate(db);
PersonState.associate(db);
PersonType.associate(db);
Equipment.associate(db);
EquipmentState.associate(db);
EquipmentType.associate(db);
Sensor.associate(db);
SensorState.associate(db);
SensorType.associate(db);
Request.associate(db);
RequestState.associate(db);
RequestType.associate(db);
Task.associate(db);
TaskState.associate(db);
TaskType.associate(db);

module.exports = db;
