'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeRestaurantVote = sequelize.define('EmployeeRestaurantVote', {
    employeeId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER
  }, {});
  EmployeeRestaurantVote.associate = function(models) {
    // associations can be defined here
    sequelize.models.Employee.belongsToMany(models.Restaurant, { as: 'Restaurant', through: 'EmployeeRestaurantVote', foreignKey:'restaurantId' });
    sequelize.models.Restaurant.belongsToMany(models.Employee, { as: 'Employee', through: 'EmployeeRestaurantVote', foreignKey:'employeeId' });

  };
  return EmployeeRestaurantVote;
};