export class AppRoutes {
	constructor(app){
		this._app = app
	}

	bindAppRoutes(){
		//rota teste
		this._app.getServer().get('/', (req, res) => {
			res.send({welcome:"Ola!"});
		})
	}
}