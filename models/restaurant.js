'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING
  }, {});
  Restaurant.associate = function(models) {
    // associations can be defined here
    Restaurant.belongsToMany(models.Employee, { through: 'RestaurantsEmployeesVotes' );
  };
  return Restaurant;
};