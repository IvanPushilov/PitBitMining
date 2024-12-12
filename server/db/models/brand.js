'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate({SubBrand, Miner, Modell}) {
      this.hasMany(SubBrand, {foreignKey: 'brand_id'})
      this.hasMany(Miner, {foreignKey: 'brand_id'})
      this.hasMany(Modell, {foreignKey: 'brand_id'})
    }
  }
  Brand.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};