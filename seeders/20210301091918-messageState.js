'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'message_states',
      [
        {
          name: 'waiting',
        },
        {
          name: 'proceeding',
        },
        {
          name: 'done',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('message_states', null, {});
  },
};
