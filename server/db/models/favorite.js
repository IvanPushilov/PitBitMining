'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    
    static associate({ Miner, User }) {
      this.belongsTo(Miner, { foreignKey: 'miner_id' });
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Favorite.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      miner_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Miners',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Favorite',
    }
  );
  return Favorite;
};
