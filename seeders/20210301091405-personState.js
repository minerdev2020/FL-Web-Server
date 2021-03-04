'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'person_states',
      [
        {
          name: 'offline',
        },
        {
          name: 'online',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('person_states', null, {});
  },
};
