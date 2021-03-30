'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'task_states',
      [
        {
          name: '进行中',
        },
        {
          name: '已完成',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('task_states', null, {});
  },
};
