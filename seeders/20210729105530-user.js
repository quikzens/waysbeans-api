'use strict'
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const hashStrenght = 10

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          _id: uuidv4(),
          fullname: 'Dr. Bruce Banner',
          email: 'hulk@gmail.com',
          password: await bcrypt.hash('hulk1234', hashStrenght),
          avatar: 'hulk-avatar.png',
          profileImage: 'hulk-profile.png',
          _createdAt: new Date(),
          _updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  },
}
