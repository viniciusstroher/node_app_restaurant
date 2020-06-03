'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return await queryInterface.bulkInsert('RestaurantsEmployeesVotes', [{
      EmployeeId: 1,
      RestaurantId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      EmployeeId: 2,
      RestaurantId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RestaurantsEmployeesVotes', null, {});
  }
};
