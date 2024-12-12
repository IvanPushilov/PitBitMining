'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modell extends Model {
    static associate({SubBrand, Miner, Brand}) {
      this.belongsTo(SubBrand, {foreignKey: 'subbrand_id'})
      this.belongsTo(Brand, {foreignKey: 'brand_id'})
      this.hasMany(Miner, {foreignKey: 'modell_id'})
    }
  }
  Modell.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subbrand_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SubBrands',
        key: 'id'
      }
    },
    brand_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Brands',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Modell',
  });
  return Modell;
};