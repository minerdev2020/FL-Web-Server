module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'alert_types',
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
    await queryInterface.bulkDelete('alert_types', null, {});
  },
};
