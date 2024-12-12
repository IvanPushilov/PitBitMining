'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Comment}) {
     
      this.hasMany(Comment, {foreignKey: 'user_id'})
    }
  }
  User.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    role:{
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'user',
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};