'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const modelsData = [
     {
       name: ' S19K Pro',
       subbrand_id: 1,
       brand_id: 1,
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       name: 'M30S+',
       subbrand_id: 2,
       brand_id: 2,
       createdAt: new Date(),
       updatedAt: new Date(),
     },
   ]
   const models = modelsData.map((model) => ({
     ...model,
     createdAt: new Date(),
     updatedAt: new Date(),
   }))
   await queryInterface.bulkInsert("Modells", models);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Modells")
  }
};
