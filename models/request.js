const Sequelize = require('sequelize');

module.exports = class Request extends Sequelize.Model {
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
    db.Request.belongsTo(db.Equipment, {
      foreignKey: 'equipment_id',
      targetKey: 'id',
      as: 'equipment_info',
    });

    db.Request.belongsTo(db.Person, {
      foreignKey: 'from_id',
      targetKey: 'id',
      as: 'from',
    });

    db.Request.belongsTo(db.Person, {
      foreignKey: 'reply_id',
      targetKey: 'id',
      as: 'replyer',
    });

    db.Request.belongsTo(db.RequestState, {
      foreignKey: 'state_id',
      targetKey: 'id',
      as: 'state',
    });

    db.Request.belongsTo(db.RequestType, {
      foreignKey: 'type_id',
      targetKey: 'id',
      as: 'type',
    });
  }
};
