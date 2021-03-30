const Sequelize = require('sequelize');

module.exports = class Person extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Person',
        tableName: 'persons',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Person.hasOne(db.User, {
      foreignKey: 'person_id',
      sourceKey: 'id',
      as: 'user_info',
    });

    db.Person.hasMany(db.Message, {
      foreignKey: 'from_id',
      sourceKey: 'id',
      as: 'from',
    });

    db.Person.hasMany(db.Message, {
      foreignKey: 'reply_id',
      sourceKey: 'id',
      as: 'replyer',
    });

    db.Person.hasMany(db.Task, {
      foreignKey: 'repairman_id',
      sourceKey: 'id',
      as: 'repairman',
    });

    db.Person.belongsTo(db.PersonState, {
      foreignKey: 'state_id',
      targetKey: 'id',
      as: 'state',
    });

    db.Person.belongsTo(db.PersonType, {
      foreignKey: 'type_id',
      targetKey: 'id',
      as: 'type',
    });
  }
};
