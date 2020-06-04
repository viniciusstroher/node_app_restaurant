'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmployeeRestaurantVotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER

      },
      employeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Employees',
          key: 'id'
        }
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Restaurants',
          key: 'id'
        }
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
    return queryInterface.dropTable('EmployeeRestaurantVotes');
  }
};