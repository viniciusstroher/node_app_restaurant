'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurants', [{
      name: 'Pampa burguer',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Cachorroquente do bigode',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Petiskeira',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};
