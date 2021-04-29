module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'alert_states',
      [
        {
          name: '进行中',
        },
        {
          name: '已完成',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('alert_states', null, {});
  },
};
