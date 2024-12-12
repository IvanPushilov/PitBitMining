'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order }) {
      this.belongsTo(Order, { foreignKey: 'order_id' });
    }
  }
  Delivery.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      first_name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      middle_name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      last_name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      address: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      city: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      phone: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      passport: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      inn: {
        allowNull: true, // Для физических лиц это поле может быть пустым
        type: DataTypes.TEXT,
      },
      company_name: {
        allowNull: true, // Для физических лиц это поле может быть пустым
        type: DataTypes.TEXT,
      },
      status: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      delivery_method: {
        allowNull: false,
        type: DataTypes.ENUM('delivery', 'pickup'), // Способ доставки
      },
      order_id: {
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
      modelName: 'Delivery',
    }
  );
  return Delivery;
};
