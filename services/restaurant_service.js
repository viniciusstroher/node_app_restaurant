import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize'

export default class RestaurantService {
	constructor(db){
		this._db = db
	}

	async create(name,employeeId){
		const Op = Sequelize.Op
		const models = this._db.sequelize.models
		const employee = await models.Restaurant.findOne({where:{name,employeeId}})
		if(employee === null){
			return await models.Restaurant.create({name,employeeId})
		}

		return employee
	}

	async getList(){
		const models = this._db.sequelize.models
		return await models.Restaurant.findAll()
	}
	
}