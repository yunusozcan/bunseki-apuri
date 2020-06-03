module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
      'Sites',
      [
        {
          webAdress: 'test.com',
          uuId: 'TC-332211',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Components', null, {}),
};
