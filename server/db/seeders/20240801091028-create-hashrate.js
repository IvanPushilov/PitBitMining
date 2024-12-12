'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashratesData = [
      {
        rate: '115 Th/s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rate: '120 Th/s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    const hashrates = hashratesData.map((hashrate) => ({
      ...hashrate,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
    await queryInterface.bulkInsert("Hashrates", hashrates);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Hashrates")
  }
};
