'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'message_types',
      [
        {
          name: '维修申请',
        },
        {
          name: '允许维修',
        },
        {
          name: '拒绝维修',
        },
        {
          name: '停用申请',
        },
        {
          name: '允许停用',
        },
        {
          name: '拒绝停用',
        },
        {
          name: '启动申请',
        },
        {
          name: '允许启动',
        },
        {
          name: '拒绝启动',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('message_types', null, {});
  },
};
