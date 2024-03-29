const Sequelize = require('sequelize');

module.exports = class Equipment extends Sequelize.Model {
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
        booting_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Equipment',
        tableName: 'equipments',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Equipment.hasMany(db.Sensor, {
      foreignKey: 'parent_id',
      sourceKey: 'id',
      as: 'sensor_info',
    });

    db.Equipment.hasMany(db.Alert, {
      foreignKey: 'breakdown_id',
      sourceKey: 'id',
      as: 'breakdown_info',
    });

    db.Equipment.hasMany(db.Request, {
      foreignKey: 'equipment_id',
      sourceKey: 'id',
      as: 'equipment_info',
    });

    db.Equipment.hasMany(db.Task, {
      foreignKey: 'target_id',
      sourceKey: 'id',
      as: 'target',
    });

    db.Equipment.belongsTo(db.EquipmentState, {
      foreignKey: 'state_id',
      targetKey: 'id',
      as: 'state',
    });

    db.Equipment.belongsTo(db.EquipmentType, {
      foreignKey: 'type_id',
      targetKey: 'id',
      as: 'type',
    });
  }
};
