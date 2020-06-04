'use strict';
const crypto = require('crypto')
module.exports = {
  up: async(queryInterface, Sequelize) => {
    const pwd = '123'
    const pwdMD5 = crypto.createHash('md5').update(pwd).digest("hex")
    return await queryInterface.bulkInsert('Employees', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      pwd:pwdMD5,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Tia',
      lastName: 'Maria',
      email: 'tia.maria@example.com',
      pwd:pwdMD5,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Mariazinha',
      lastName: 'Silva',
      email: 'litlemary@example.com',
      pwd:pwdMD5,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Employees', null, {});
  }
};
