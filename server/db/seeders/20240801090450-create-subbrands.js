'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 const subbrandsData = [
  {
    name: 'Antminer',
    img:  '/profileImg/logo1.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    brand_id: 1
  },
  {
    name: 'Whatsminer',
    img:  '/profileImg/logo2.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    brand_id: 2
  },
  {
    name: 'Elphapex',
    img:  '/profileImg/logo3.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    brand_id: 3
  },
  {
    name: 'Ice River',
    img:  '/profileImg/logo4.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    brand_id: 4
  },
  {
    name: 'Jas Miner',
    img:  '/profileImg/logo5.png',
    createdAt: new Date(),
    updatedAt: new Date(),
    brand_id: 5
  },
 ]
 const subbrands = subbrandsData.map((subbrand) => ({
   ...subbrand,
   createdAt: new Date(),
   updatedAt: new Date(),
 }))
 await queryInterface.bulkInsert("SubBrands", subbrands);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SubBrands")
  }
};
