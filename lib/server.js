import Logger from './logger.js'


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
		this._server.listen(this._port)
	}
	
};