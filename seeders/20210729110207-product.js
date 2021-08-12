'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'ETHIOPIA Beans',
          price: 299900,
          description:
            'Hampir semua referensi sepakat mengatakan bahwa kopi pertama kali ditemukan di Ethiopia, meskipun ada juga beberapa protes yang menyatakan bahwa Coffea arabica sebenarnya muncul pertama kali di bagian selatan Sudan.',
          stock: 200,
          photo: 'ethiopia.png',
          _createdAt: new Date(),
          _updatedAt: new Date(),
        },
        {
          name: 'RWANDA Beans',
          price: 109900,
          description:
            'Hampir semua referensi sepakat mengatakan bahwa kopi pertama kali ditemukan di Rwanda, meskipun ada juga beberapa protes yang menyatakan bahwa Coffea arabica sebenarnya muncul pertama kali di bagian selatan Sudan.',
          stock: 99,
          photo: 'rwanda.png',
          _createdAt: new Date(),
          _updatedAt: new Date(),
        },
        {
          name: 'NICARAGUA Beans',
          price: 250900,
          description:
            'Hampir semua referensi sepakat mengatakan bahwa kopi pertama kali ditemukan di Nicaragua, meskipun ada juga beberapa protes yang menyatakan bahwa Coffea arabica sebenarnya muncul pertama kali di bagian selatan Sudan.',
          stock: 352,
          photo: 'nicaragua.png',
          _createdAt: new Date(),
          _updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {})
  },
}
