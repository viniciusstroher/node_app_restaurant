'use strict';

module.exports = {
   up:  async(queryInterface, Sequelize) => {
    
    return await queryInterface.bulkInsert('EmployeeRestaurantVotes', [{
      employeeId: 1,
      restaurantId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      employeeId: 2,
      restaurantId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EmployeeRestaurantVotes', null, {});
  }
};
