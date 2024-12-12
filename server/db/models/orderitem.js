'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Miner, Order, Service }) {
      this.belongsTo(Miner, { foreignKey: 'miner_id' });
      this.belongsTo(Order, { foreignKey: 'order_id' });
      this.belongsTo(Service, { foreignKey: 'service_id' });
    }
  }
  OrderItem.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      order_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Orders',
          key: 'id',
        },
      },
      miner_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Miners',
          key: 'id'
        }
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      total_price: {
        type: DataTypes.INTEGER,
      },
      service_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Services',
          key: 'id',
        },
      },
      count: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
      modelName: 'OrderItem',
    }
  );
  return OrderItem;
};
