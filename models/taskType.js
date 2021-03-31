const Sequelize = require('sequelize');

module.exports = class TaskType extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.TaskType.hasMany(db.Task, {
      foreignKey: 'type_id',
      targetKey: 'id',
      as: 'type',
    });
  }
};
