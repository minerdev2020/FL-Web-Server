module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'message_states',
      [
        {
          name: '等待中',
        },
        {
          name: '已接受',
        },
        {
          name: '已拒绝',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('message_states', null, {});
  },
};
