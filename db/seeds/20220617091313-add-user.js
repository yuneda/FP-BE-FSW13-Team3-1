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
    const passwordHash = await require('bcryptjs').hash(process.env.USER_PASSWORD, 10);
    await queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'admin@mail.com',
      password: passwordHash,
      no_tlpn: '081234567890',
      city: 'Jakarta',
      address: 'Jl Sudirman',
      image: 'string',
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
