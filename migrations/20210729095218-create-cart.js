'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('carts', {
      _id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      productId: {
        type: Sequelize.STRING,
      },
      transactionId: {
        type: Sequelize.STRING,
      },
      orderQuantity: {
        type: Sequelize.INTEGER,
      },
      _createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      _updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('carts')
  },
}
