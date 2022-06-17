'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Products', [{
      id_user: 1,
      product_name: 'Jam Casio A',
      product_price: 190000,
      category: 'Aksesoris',
      description: 'Hitam',
      image: 'image',
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user: 1,
      product_name: 'Sepeda',
      product_price: 2000000,
      category: 'Hobi',
      description: 'Hitam',
      image: 'image',
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user: 1,
      product_name: 'Baju A',
      product_price: 50000,
      category: 'Putih',
      description: 'Hitam',
      image: 'image',
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
