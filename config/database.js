const path = require('path');

module.exports = {
  "development": {
    "username": 'root',
    "password": 'root',
    "storage": "./database/database.sqlite",
    "host": 'localhost',
    "dialect": 'sqlite',
    // "logging": true,
    "operatorsAliases": false
  },

  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
