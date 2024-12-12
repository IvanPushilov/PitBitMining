'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Miner, User}) {
      this.belongsTo(User, {foreignKey: 'user_id'})
      this.belongsTo(Miner, {foreignKey: 'miner_id'})
    }
  }
  Comment.init({
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    miner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Miners',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};