'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Algorithm extends Model {
    static associate() {
    }
  }
  Algorithm.init({
    algo: {
      type: DataTypes.TEXT,
      unique: true
    },
  },
   {
    sequelize,
    modelName: 'Algorithm',
  });
  return Algorithm;
};