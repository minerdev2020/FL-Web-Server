'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'person_states',
      [
        {
          name: 'online',
        },
        {
          name: 'offline',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('person_states', null, {});
  },
};
