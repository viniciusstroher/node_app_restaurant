import Logger from './logger.js'

export class Server{
	
	constructor(server,port){
		this._server = server
		this._port = port
		this._routes = [];
	}

	getServer(routes){
		return this._server //usar este metodo para bindar 
	}

	start(){
		Logger.log(`Iniciando servidor na porta ${this._port}.`)
		this._server.listen(this._port)
	}
	
};