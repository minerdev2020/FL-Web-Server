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
    await queryInterface.bulkDelete('equipment_states', null, {});
  },
};
