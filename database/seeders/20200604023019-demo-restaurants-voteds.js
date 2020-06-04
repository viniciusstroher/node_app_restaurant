'use strict';

module.exports = {
   up: async(queryInterface, Sequelize) => {
    return await null
    /*queryInterface.bulkInsert('RestaurantVotes', [{
      restaurantId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }])*/
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RestaurantVotes', null, {});
  }
};
