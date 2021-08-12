'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      })

      Transaction.hasMany(models.Cart, {
        as: 'products',
        foreignKey: 'transactionId',
      })
    }
  }

  Transaction.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      attachment: DataTypes.STRING,
      status: DataTypes.STRING,
      possCode: DataTypes.STRING,
      total: DataTypes.INTEGER,
      _createdAt: DataTypes.DATE,
      _updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      id: false,
      timestamps: false,
      modelName: 'Transaction',
      tableName: 'transactions',
    }
  )

  return Transaction
}
