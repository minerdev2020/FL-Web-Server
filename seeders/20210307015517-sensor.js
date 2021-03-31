module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'sensors',
      [
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test00',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '1',
          parent_id: '1',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test01',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '2',
          parent_id: '1',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test02',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '1',
          parent_id: '1',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test03',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '2',
          parent_id: '2',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test04',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '1',
          parent_id: '2',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test05',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '2',
          parent_id: '3',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test06',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '1',
          parent_id: '3',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test07',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '2',
          parent_id: '4',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test08',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '1',
          parent_id: '4',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test09',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '2',
          parent_id: '5',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test10',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '1',
          parent_id: '6',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test11',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '2',
          parent_id: '7',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test12',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '1',
          parent_id: '8',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test13',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '2',
          parent_id: '8',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test14',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '1',
          parent_id: '11',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test15',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '2',
          parent_id: '11',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test16',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '1',
          parent_id: '12',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test17',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '2',
          parent_id: '15',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test18',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '1',
          parent_id: '16',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test19',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '2',
          parent_id: '16',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test20',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '1',
          parent_id: '16',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test21',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '2',
          parent_id: '20',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test22',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '1',
          parent_id: '20',
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          name: 'test23',
          model_number: 'model.123123',
          state_id: '1',
          type_id: '2',
          parent_id: '21',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sensors', null, {});
  },
};
