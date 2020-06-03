'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Employees', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      pwd:'123',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Tia',
      lastName: 'Maria',
      email: 'tia.maria@example.com',
      pwd:'123',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Mariazinha',
      lastName: 'Silva',
      email: 'litlemary@example.com',
      pwd:'123',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Employees', null, {});
  }
};
