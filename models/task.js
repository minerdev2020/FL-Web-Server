const Sequelize = require('sequelize');

module.exports = class Task extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {},
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
    db.Task.belongsTo(db.Person, {
      foreignKey: 'repairman_id',
      targetKey: 'id',
      as: 'repairman',
    });

    db.Task.belongsTo(db.Equipment, {
      foreignKey: 'target_id',
      targetKey: 'id',
      as: 'target',
    });

    db.Task.belongsTo(db.TaskState, {
      foreignKey: 'state_id',
      targetKey: 'id',
      as: 'state',
    });

    db.Task.belongsTo(db.TaskType, {
      foreignKey: 'type_id',
      targetKey: 'id',
      as: 'type',
    });
  }
};
