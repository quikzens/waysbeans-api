'use strict'

const { Model } = require('sequelize')
const { v4: uuidv4 } = require('uuid')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Transaction, {
        as: 'transaction',
        foreignKey: 'userId',
      })
    }
  }

  User.init(
    {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: uuidv4(),
      },
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      profileImage: DataTypes.STRING,
      _createdAt: DataTypes.DATE,
      _updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      timestamps: false,
      id: false,
      modelName: 'User',
      tableName: 'users',
    }
  )

  return User
}
