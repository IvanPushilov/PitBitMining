'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
 const currenciesData = [
   {
     name: 'BTC',
     createdAt: new Date(),
     updatedAt: new Date(),
   },
   {
     name: 'BCH',
     createdAt: new Date(),
     updatedAt: new Date(),
   },
   {
     name: 'BCV',
     createdAt: new Date(),
     updatedAt: new Date(),
   },
   {
     name: 'ETH',
     createdAt: new Date(),
     updatedAt: new Date(),
   },
   {
     name: 'LTC',
     createdAt: new Date(),
     updatedAt: new Date(),
   },
   {
     name: 'DOGE',
     createdAt: new Date(),
     updatedAt: new Date(),
   },
 ]
 const currencies = currenciesData.map((currency) => ({
   ...currency,
   createdAt: new Date(),
   updatedAt: new Date(),
  }))
  await queryInterface.bulkInsert("Currencies", currencies);
  },

  async down (queryInterface) {
   await queryInterface.bulkDelete("Currencies")
  }
};
