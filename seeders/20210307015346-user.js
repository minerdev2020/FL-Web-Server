'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = await bcrypt.hash('123', 12);
    await queryInterface.bulkInsert(
      'users',
      [
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test00',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '1',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test01',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '2',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test02',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '3',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test03',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '4',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test04',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '5',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test05',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '6',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test06',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '7',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test07',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '8',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test08',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '9',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test09',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '10',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test10',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '11',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test11',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '12',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test12',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '13',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test13',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '14',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test14',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '15',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test15',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '16',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test16',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '17',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test17',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '18',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test18',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '19',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test19',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '20',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test20',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '21',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test21',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '22',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test22',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '23',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          user_id: 'test23',
          user_pw: hash,
          ip: '127.0.0.1',
          person_id: '24',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};