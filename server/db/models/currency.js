'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    static associate({Miner}) {
      this.hasMany(Miner, { foreignKey: 'currency_id'})
    }
  }
  Currency.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },  }, {
    sequelize,
    modelName: 'Currency',
  });
  return Currency;
};