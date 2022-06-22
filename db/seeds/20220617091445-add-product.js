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
      product_price: 200000,
      category: 'Aksesoris',
      description: 'Hitam',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEUnRDyM2OVREccY5bAERIYdejSLexg3NAw&usqp=CAU',
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user: 1,
      product_name: 'Sepeda',
      product_price: 2000000,
      category: 'Kendaraan',
      description: 'Hitam',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlbFIMvzGpfxz47xRME_-tv4qmrQP0jd7UmA&usqp=CAU',
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user: 1,
      product_name: 'Tas Gunung',
      product_price: 200000,
      category: 'Hobi',
      description: 'Hitam',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl-D6TbKFFwgvyzXECfBj2KVNy1I8znkIX1A&usqp=CAU',
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user: 1,
      product_name: 'Baju A',
      product_price: 50000,
      category: 'Baju',
      description: 'Orange',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1i_TsrDJgMJuBTQhDH9TMhKPJO7BegGNjA&usqp=CAU',
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user: 1,
      product_name: 'Oppo X',
      product_price: 2500000,
      category: 'Elektronik',
      description: 'Biru',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP8mJZRZxALG-FLhrCnU6xVIcTZEF9JORIYA&usqp=CAU',
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user: 1,
      product_name: 'PCX',
      product_price: 25000000,
      category: 'Kendaraan',
      description: 'Hitam',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeSp8zdpYNe2BB65Rh5tEnDbrNfrleGgy3ZA&usqp=CAU',
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id_user: 1,
      product_name: 'Supra GTR',
      product_price: 20000000,
      category: 'Kendaraan',
      description: 'Hitam',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQecnxKZrnTsO9fWR__ywcHzONLR3PhdpAOGg&usqp=CAU',
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
