import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize'
import Logger from './logger.js'

export class Database {
	constructor(databaseConfig){
		this._db = new Sequelize(databaseConfig)
	}

	async init(){
		try {
		  await this._db.authenticate();
		  Logger.log('Connection has been established successfully.');
		} catch (error) {
		  Logger.error('Unable to connect to the database:', error);
		}
	}

	loadModels(pathModels){
		fs
		  .readdirSync(pathModels)
		  .filter(file => {
		    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
		  })
		  .forEach((file) => {
		  	const model = this._db.import(pathModels+file);
		    this._db[model.name] = model;
		  });

		Object.keys(this._db).forEach((modelName) => {
		  if (this._db[modelName].associate) {
		    this._db[modelName].associate(this._db);
		  }
		});

		Logger.log('Loaded Data models successfully.');
	}

	getDb(){
		return this._db
	}
}