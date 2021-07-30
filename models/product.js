'use strict'

const { Model } = require('sequelize')
const { v4: uuidv4 } = require('uuid')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasOne(models.Cart, {
        as: 'cart',
        foreignKey: 'productId',
      })
    }
  }

  Product.init(
    {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: uuidv4(),
      },
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      photo: DataTypes.STRING,
      _createdAt: DataTypes.DATE,
      _updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      id: false,
      timestamps: false,
      modelName: 'Product',
      tableName: 'products',
    }
  )

  return Product
}
