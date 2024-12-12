'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
   
    static associate() {
      // define association here
    }
  }
  Post.init({
    title: {
      type: DataTypes.TEXT
    },
    text: {
      type:DataTypes.TEXT
    },
    img: {
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    video: {
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    preview: {
      type:DataTypes.STRING,
      allowNull: true
    },
  
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};


