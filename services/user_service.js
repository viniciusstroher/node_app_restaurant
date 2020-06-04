import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize'

export class UserService {
	constructor(db){
		this._db = db
	}

	//auth
	async auth(user,password){
		const models = this._db.sequelize.models
		return await models.Employees.findOne({where:{user,password}}) //sem crypto (mas poderia te um bcrypt/md5)
	}

}