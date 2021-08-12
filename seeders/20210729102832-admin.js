'use strict'
const bcrypt = require('bcrypt')
const hashStrenght = 10

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'admin',
      [
        {
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
