'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Miner extends Model {
  
    static associate({Service, Comment, Currency, Algorithm, Modell, Brand, SubBrand, Hashrate}) {
      this.hasMany(Comment, {foreignKey: 'miner_id'})
      this.belongsTo(Currency, {foreignKey: 'currency_id'})
      this.belongsTo(Hashrate, {foreignKey: 'hashrate_id'})
      this.belongsTo(Algorithm, {foreignKey: 'algorithm_id'})
      this.belongsTo(Modell, {foreignKey: 'modell_id'})
      this.belongsTo(Brand, {foreignKey: 'brand_id'})
      this.belongsTo(SubBrand, {foreignKey: 'subbrand_id'})
      this.belongsTo(Service, {foreignKey: 'service_id'})
    }
  }
  Miner.init({
    currency_id: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    
    },
    algorithm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Algorithms',
        key: 'id'
      }
    },
    modell_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Modells',
        key: 'id'
      }
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Brands',
        key: 'id'
      }
    },
    subbrand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SubBrands',
        key: 'id'
      }
    },
    img: {
      type:DataTypes.ARRAY(DataTypes.STRING)
    },
    expense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hashrate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Hashrates',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    service_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Services',
        key: 'id'
      }
  }, 
  about: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  volt: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  cooling: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  temp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  loud: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  },
  {
    sequelize,
    modelName: 'Miner',
  });
  return Miner;
};