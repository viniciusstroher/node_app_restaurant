import express from 'express'
import {serverConfig} from './config/server.js'
import * as databaseConfig from './config/database.js'
import db from './models/index.js'
import {Server} from './lib/server.js'
import {AppRoutes} from './routes/routes.js'
import * as path from 'path';

(async () => {
	const rootPath = path.resolve('.');

	await db.sequelize.authenticate()

	const expressServer = new express()
	const app = new Server(expressServer,serverConfig.port)
	const appRoutes = new AppRoutes(app,db)

	appRoutes.bindAppRoutes()
	app.start()
})()