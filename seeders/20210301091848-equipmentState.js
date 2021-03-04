'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'equipment_states',
      [
        {
          name: 'running',
        },
        {
          name: 'under repair',
        },
        {
          name: 'stoped',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('equipment_states', null, {});
  },
};
