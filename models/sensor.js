const Sequelize = require('sequelize');

module.exports = class Sensor extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        model_number: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Sensor.belongsTo(db.Equipment, {
      foreignKey: 'parent_id',
      targetKey: 'id',
      as: 'sensor_info',
    });

    db.Sensor.belongsTo(db.SensorState, {
      foreignKey: 'state_id',
      targetKey: 'id',
      as: 'state',
    });

    db.Sensor.belongsTo(db.SensorType, {
      foreignKey: 'type_id',
      targetKey: 'id',
      as: 'type',
    });
  }
};
