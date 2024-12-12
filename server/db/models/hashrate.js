'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hashrate extends Model {
  
    static associate({Miner}) {
      this.hasMany(Miner, { foreignKey: 'hashrate_id'})
    }
  }
  Hashrate.init({
    rate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'Hashrate',
  });
  return Hashrate;
};