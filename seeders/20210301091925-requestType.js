module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'request_types',
      [
        {
          name: '维修申请',
        },
        {
          name: '停用申请',
        },
        {
          name: '启动申请',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('request_types', null, {});
  },
};
