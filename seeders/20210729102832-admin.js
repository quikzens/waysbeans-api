'use strict'
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const hashStrenght = 10

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'admin',
      [
        {
          _id: uuidv4(),
          fullname: 'Spiderman',
          email: 'spiderman@gmail.com',
          password: await bcrypt.hash('spider1234', hashStrenght),
          _createdAt: new Date(),
          _updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('admin', null, {})
  },
}
