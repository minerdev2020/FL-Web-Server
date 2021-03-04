'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'sensor_states',
      [
        {
          name: '运行中',
        },
        {
          name: '维修中',
        },
        {
          name: '停用',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sensors_states', null, {});
  },
};
