'use strict';
module.exports = (sequelize, DataTypes) => {
  const RestaurantVotes = sequelize.define('RestaurantVotes', {
    restaurantId: DataTypes.INTEGER
  }, {});
  RestaurantVotes.associate = function(models) {
    // associations can be defined here
    // sequelize.models.RestaurantVoted.belongsToMany(models.Restaurant, { as: 'Restaurant', through: 'EmployeeRestaurantVote', foreignKey:'restaurantId' });
  };
  return RestaurantVotes;
};