'use strict';

module.exports = {
   up: async(queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('RestaurantVotes', [{
      restaurantId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RestaurantVotes', null, {});
  }
};
