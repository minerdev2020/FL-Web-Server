const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sequelize.STRING(10),
          allowNull: false,
          unique: true,
        },
        user_pw: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        ip: {
          type: Sequelize.STRING(16),
          allowNull: true,
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
    db.User.belongsTo(db.Person, {
      foreignKey: 'person_id',
      targetKey: 'id',
    });
  }
};
