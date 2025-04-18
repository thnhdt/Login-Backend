'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Messages', 'receiver', 'room');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Messages', 'room', 'receiver');
  },
};
