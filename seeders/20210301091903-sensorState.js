'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'sensor_states',
      [
        {
          name: 'running',
        },
        {
          name: 'stoped',
        },
        {
          name: 'under repair',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sensors_states', null, {});
  },
};
