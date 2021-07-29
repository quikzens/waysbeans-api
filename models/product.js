'use strict'

const { Model } = require('sequelize')

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
      _id: DataTypes.UUID,
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
      modelName: 'Product',
      tableName: 'products',
    }
  )

  return Product
}
