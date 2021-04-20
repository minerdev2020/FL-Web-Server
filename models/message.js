const Sequelize = require('sequelize');

module.exports = class Message extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        estimated_time: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        contents: {
          type: Sequelize.TEXT,
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
    db.Message.belongsTo(db.Equipment, {
      foreignKey: 'equipment_id',
      targetKey: 'id',
      as: 'equipment_info',
    });

    db.Message.belongsTo(db.Person, {
      foreignKey: 'from_id',
      targetKey: 'id',
      as: 'from',
    });

    db.Message.belongsTo(db.Person, {
      foreignKey: 'reply_id',
      targetKey: 'id',
      as: 'replyer',
    });

    db.Message.belongsTo(db.MessageState, {
      foreignKey: 'state_id',
      targetKey: 'id',
      as: 'state',
    });

    db.Message.belongsTo(db.MessageType, {
      foreignKey: 'type_id',
      targetKey: 'id',
      as: 'type',
    });
  }
};
