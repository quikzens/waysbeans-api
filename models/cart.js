'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.Product, {
        as: 'product',
        foreignKey: 'productId',
      })

      Cart.belongsTo(models.Transaction, {
        as: 'transaction',
        foreignKey: 'transactionId',
      })
    }
  }

  Cart.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: DataTypes.INTEGER,
      transactionId: DataTypes.INTEGER,
      orderQuantity: DataTypes.INTEGER,
      _createdAt: DataTypes.DATE,
      _updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      id: false,
      timestamps: false,
      modelName: 'Cart',
      tableName: 'carts',
    }
  )

  return Cart
}
