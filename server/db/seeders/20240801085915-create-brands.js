'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const brandsData = [
     {
       name: 'Bitmain',
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       name: 'MicroBt',
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
      name: 'Alpha Pex',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Ice River',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Jas Miner',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
   ]
   const brands = brandsData.map((brand) => ({
     ...brand,
     createdAt: new Date(),
     updatedAt: new Date(),
   }))
   await queryInterface.bulkInsert("Brands", brands);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Brands")
  }
};
