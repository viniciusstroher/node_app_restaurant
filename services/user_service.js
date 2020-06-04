import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize'
import crypto from 'crypto'
import hat from 'hat'

export default class UserService {
	constructor(db){
		this._db = db
	}

	//auth
	async auth(email,pwd){
		const models = this._db.sequelize.models
		const pwdMD5 = crypto.createHash('md5').update(pwd.toString()).digest("hex")
		return await models.Employee.findOne({where:{email,pwd:pwdMD5}}) //sem crypto (mas poderia te um bcrypt/md5)
	}

	async generateApiToken(){
		return hat()
	}
}