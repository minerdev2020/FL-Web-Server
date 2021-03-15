'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'equipment_types',
      [
        {
          name: '生产线1',
        },
        {
          name: '生产线2',
        },
        {
          name: '生产线3',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('equipment_types', null, {});
  },
};
