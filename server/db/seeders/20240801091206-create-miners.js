'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const minersData = [
     {
      currency_id: [1, 2],
      algorithm_id: 1,
      brand_id: 1,
      modell_id: 1,
      subbrand_id: 1,
      img:  ['/filestorage/asic.png'],
      expense: 4000,
      price: 300000,
      hashrate_id: 1,
      description: 'Bitmain miner',
     }
   ]
   const miners = minersData.map((miner) => ({
     ...miner,
     createdAt: new Date(),
     updatedAt: new Date(),
   }))
   await queryInterface.bulkInsert("Miners", miners);
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete("Miners")
  }
};
