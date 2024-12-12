'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
  
    static associate({Miner}) {
      this.hasMany(Miner, {foreignKey: 'service_id'})
    }
  }
  Service.init({
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, 
  {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};