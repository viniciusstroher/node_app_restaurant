import express from 'express'
import {serverConfig} from './config/server.js'
import * as databaseConfig from './config/database.js'
import db from './models/index.js'
import {Server} from './lib/server.js'
import {AppRoutes} from './routes/routes.js'
import * as path from 'path';
import cron  from 'node-cron'
import moment from 'moment'
import Logger from './lib/logger.js'

(async () => {
	const rootPath = path.resolve('.');

	await db.sequelize.authenticate()

	const expressServer = new express()
	const app = new Server(expressServer,serverConfig.port)
	const appRoutes = new AppRoutes(app,db)
	
	//roda todo dia 11 e 30
	cron.schedule("30 11 * * *", () => {
		Logger.log("Calculando restaurante favorito")
		const now = moment()
		const prs = new PollRestaurantService(db)
		prs.calculateRestaurantMostVotedToday(now)
	});

	// cron.schedule("* * * * *", () => {
	// 	Logger.log("teste cron")
	// });

	appRoutes.bindAppRoutes()
	app.start()
})()