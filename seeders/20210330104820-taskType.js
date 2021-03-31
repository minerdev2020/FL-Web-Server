module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'task_types',
      [
        {
          name: '维修任务',
        },
        {
          name: '停用任务',
        },
        {
          name: '启动任务',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('task_types', null, {});
  },
};
