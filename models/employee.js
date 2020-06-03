'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    pwd: DataTypes.STRING
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
    //EX: User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId' })

    Employee.belongsToMany(models.Restaurant, { through: 'RestaurantsEmployeesVotes' });

  };
  return Employee;
};