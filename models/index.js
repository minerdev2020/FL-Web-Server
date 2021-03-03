const Sequelize = require('sequelize');

const User = require('./user');

const Person = require('./person');
const PersonState = require('./personState');
const PersonType = require('./personType');

const Equipment = require('./equipment');
const EquipmentState = require('./equipmentState');
const EquipmentType = require('./equipmetnType');

const Sensor = require('./sensor');
const SensorState = require('./sensorState');
const SensorType = require('./sensorType');

const Message = require('./message');
const MessageState = require('./messageState');
const MessageType = require('./messageType');

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
  Person,
  PersonState,
  PersonType,
  Equipment,
  EquipmentState,
  EquipmentType,
  Sensor,
  SensorState,
  SensorType,
  Message,
  MessageState,
  MessageType,
};

User.init(sequelize);
Person.init(sequelize);
PersonState.init(sequelize);
PersonType.init(sequelize);
Equipment.init(sequelize);
EquipmentState.init(sequelize);
EquipmentType.init(sequelize);
Sensor.init(sequelize);
SensorState.init(sequelize);
SensorType.init(sequelize);
Message.init(sequelize);
MessageState.init(sequelize);
MessageType.init(sequelize);

User.associate(db);
Person.associate(db);
PersonState.associate(db);
PersonType.associate(db);
Equipment.associate(db);
EquipmentState.associate(db);
EquipmentType.associate(db);
Sensor.associate(db);
SensorState.associate(db);
SensorType.associate(db);
Message.associate(db);
MessageState.associate(db);
MessageType.associate(db);

module.exports = db;
