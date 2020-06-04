
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
		    	res.send({sucess:false,msg:"campos email ou pwd não foram enviados"});
		    }else{
		    	const email = req.body['email']
		    	const pwd = req.body['pwd']
		    	const us = new UserService(that._db)
		    	const auth = await us.auth(email,pwd)
		    	if(auth === null){
			    	res.send({sucess:false,msg:"Email ou senha invalidos"});
			    }else{
			    	res.send({sucess:true,msg:"Autenticado com sucesso, usa token no authorization para acessar metodos que precisao de auth",
			    			  token:us.generateApiToken()});
			    }
		    }
		})

		//auth
		this._app.getServer().post('/vote',async  (req, res) => {
			
			if(!req.body['employeeId'] || !req.body['restaurantId']){
		    	res.send({error:"campos employeeId ou restaurantId não foram enviados"});
		    }else{
		    	const employeeId = req.body['employeeId']
		    	const restaurantId = req.body['restaurantId']
		    	const prs = new PollRestaurantSercive(that._db)
		    	const auth = await prs.vote(employeeId,restaurantId)
		    	if(!auth){
			    	res.send({sucess:false,msg:"Voto já foi efetuado hoje!"});
			    }else{
			    	res.send({sucess:true,msg:"Voto realizado!"});
			    }
		    }
		})

		//auth
		this._app.getServer().get('/restaurant_voted_today',async  (req, res) => {
			const prs = new PollRestaurantSercive(that._db)
			const restaurantToday = await prs.restaurantVotedToday()
			const restaurant = await prs.getRestaurant(restaurantToday.restaurantId)

			if(restaurantToday === null){
				res.send({sucess:false,msg:"Não ha restaurante votado para hoje"})
			}else{
				res.send({sucess:true,msg:"Restaurante votado", restaurant})
			}

		})
	}
}