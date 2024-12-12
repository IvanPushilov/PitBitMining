'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   {
    const serviceData = [
      {
        price: 100000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    const services = serviceData.map((service) => ({
      ...service,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))
    await queryInterface.bulkInsert("Services", services);
   }
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete("Services");
  }
};
