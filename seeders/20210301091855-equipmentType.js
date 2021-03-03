'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'equipment_types',
      [
        {
          name: '1',
        },
        {
          name: '2',
        },
        {
          name: '3',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('equipment_types', null, {});
  },
};
