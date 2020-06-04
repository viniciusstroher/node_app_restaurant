import Logger from './logger.js'
import cron  from 'node-cron'

export class Server{
	
	constructor(server,port){
		this._server = server
		this._port = port
		this._routes = [];
	}

	getServer(){
		return this._server //usar este metodo para bindar 
	}

	start(){
		Logger.log(`Iniciando servidor na porta ${this._port}.`)
		//coloca para as 11:50 para calcular
		cron.schedule("30 11 * * *", () => {
			Logger.log("Calculando restaurante favorito")

		});

		this._server.listen(this._port)
	}
	
};