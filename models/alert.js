const Sequelize = require('sequelize');

module.exports = class Alert extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        breakdown_cause: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Alert',
        tableName: 'alerts',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Alert.belongsTo(db.Equipment, {
      foreignKey: 'breakdown_id',
      targetKey: 'id',
      as: 'breakdown_info',
    });

    db.Alert.belongsTo(db.AlertState, {
      foreignKey: 'state_id',
      targetKey: 'id',
      as: 'state',
    });

    db.Alert.belongsTo(db.AlertType, {
      foreignKey: 'type_id',
      targetKey: 'id',
      as: 'type',
    });
  }
};
