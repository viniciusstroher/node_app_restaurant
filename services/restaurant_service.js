import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize'

export class RestaurantService {
	constructor(db){
		this._db = db
	}

	async create(name,employeeId){
		const models = this._db.sequelize.models
		return await models.Restaurants.findOrCreate({{where:{ name,employeeId }})
	}

	async getList(){
		const models = this._db.sequelize.models
		return await models.Restaurants.findAll()
	}
	
}