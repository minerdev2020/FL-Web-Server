const Sequelize = require('sequelize');

module.exports = class Equipment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        number: {
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
    db.Equipment.hasMany(db.Sensor, {
      foreignKey: 'parent_id',
      sourceKey: 'id',
    });

    db.Equipment.belongsTo(db.EquipmentState, {
      foreignKey: 'state_id',
      targetKey: 'id',
    });

    db.Equipment.belongsTo(db.EquipmentType, {
      foreignKey: 'type_id',
      targetKey: 'id',
    });
  }
};
