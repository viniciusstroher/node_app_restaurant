import express from 'express'
import {serverConfig} from './config/server.js'
import {databaseConfig} from './config/database.js'
import {Database} from './lib/database.js'
import {Server} from './lib/server.js'
import {AppRoutes} from './routes/routes.js'
import * as path from 'path';
(async () => {
	const rootPath = path.resolve('.');
	const db = new Database(databaseConfig)
	//inicia db - sqlite
   	await db.init()
   	db.loadModels(rootPath+'/models/')
   	//migrations

   	const expressServer = new express()
	const app = new Server(expressServer,serverConfig.port)
	const appRoutes = new AppRoutes(app)

	appRoutes.bindAppRoutes()
	app.start()
})()