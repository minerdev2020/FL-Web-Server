'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'person_types',
      [
        {
          name: 'manager',
        },
        {
          name: 'repairman',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('person_types', null, {});
  },
};
