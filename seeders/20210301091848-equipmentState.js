'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'equipment_states',
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
    await queryInterface.bulkDelete('equipment_states', null, {});
  },
};
