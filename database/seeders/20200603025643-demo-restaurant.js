'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurants', [{
      name: 'Pampa burguer',
      employeeId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Cachorroquente do bigode',
      employeeId:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Petiskeira',
      employeeId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Morte lenta',
      employeeId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Marcellus',
      employeeId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Porto dos Files',
      employeeId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Mc Donald',
      employeeId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};
