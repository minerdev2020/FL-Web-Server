module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'sensor_types',
      [
        {
          name: '气压',
        },
        {
          name: '流速',
        },
        {
          name: '气温',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sensor_types', null, {});
  },
};
