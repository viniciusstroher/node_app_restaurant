export class AppRoutes {
	constructor(app){
		this._app = app
	}
	//midlewaRE USANDO BASIC AUTH
	bindAppRoutes(){
		//criar cron para rodar 11h antes do meio dia
		//transformar data para utc
		//rota teste
		this._app.getServer().get('/', (req, res) => {
			res.send({welcome:"Ola!"});
		})
	}
}