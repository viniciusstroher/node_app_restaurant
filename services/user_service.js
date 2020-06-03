import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize'

export class UserService {
	constructor(db){
		this._db = db
	}
}