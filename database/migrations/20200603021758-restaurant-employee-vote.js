'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RestaurantsEmployeesVotes', {
      EmployeeId: {
          type: Sequelize.UUID,
          primaryKey: true,
      },
      RestaurantId: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RestaurantsEmployeesVotes');
  }
};
