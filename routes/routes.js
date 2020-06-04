
import bodyParser from 'body-parser'
import UserService from '../services/poll_restaurant_service.js'
import PollRestaurantSercive from '../services/poll_restaurant_service.js'

export class AppRoutes {
	constructor(app,db){
		this._app = app
		this._db = db
	}

	//midlewaRE USANDO BASIC AUTH
	bindAppRoutes(){
		//criar cron para rodar 11h antes do meio dia
		//transformar data para utc
		//rota teste
		let that = this 
		this._app.getServer().use(bodyParser.json());
		this._app.getServer().get('/', (req, res, next) => {
			res.send({welcome:"Ola!"});
		})

		this._app.getServer().post('/auth',async  (req, res) => {
			
			if(!req.body['email'] || !req.body['pwd']){
		    	res.send({error:"campos email ou pwd não foram enviados"});
		    }else{
		    	let email = req.body['email']
		    	let pwd = req.body['pwd']
		    	let us = new UserService(that._db)
		    	const auth = await us.auth(email,pwd)
		    	if(auth === null){
			    	res.send({error:"Email ou senha invalidos"});
			    }else{
			    	res.send({sucess:"Autenticado com sucesso, usa token no authorization para acessar metodos que precisao de auth",
			    			  token:us.generateApiToken()});
			    }
		    }
		})

		//auth
		this._app.getServer().post('/vote',async  (req, res) => {
			
			if(!req.body['employeeId'] || !req.body['restaurantId']){
		    	res.send({error:"campos employeeId ou restaurantId não foram enviados"});
		    }else{
		    	let employeeId = req.body['employeeId']
		    	let restaurantId = req.body['restaurantId']
		    	let prs = new PollRestaurantSercive(that._db)
		    	const auth = await prs.vote(employeeId,restaurantId)
		    	if(!auth){
			    	res.send({error:"Voto já foi efetuado hoje!"});
			    }else{
			    	res.send({sucess:"Voto realizado!"});
			    }
		    }
		})

		//auth
		this._app.getServer().get('/restaurant_today',async  (req, res) => {
			let prs = new PollRestaurantSercive(that._db)
			
		    res.send({sucess:"Autenticado com sucesso, usa token no authorization para acessar metodos que precisao de auth",
		    			  token:us.generateApiToken()});
		    
		})
	}
}