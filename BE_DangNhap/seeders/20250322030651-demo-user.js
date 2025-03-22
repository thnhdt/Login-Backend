'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'seed1',
        password: '123',
        name: 'John Doe',
        email: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
