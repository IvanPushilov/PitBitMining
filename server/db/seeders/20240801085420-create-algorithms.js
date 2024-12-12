'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  const algorithmsData = [
    {
      algo: 'SHA256',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      algo: 'Scrypt',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
  const algorithms = algorithmsData.map((algorithm) => ({
    ...algorithm,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
  await queryInterface.bulkInsert("Algorithms", algorithms);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Algorithms")
  }
};
