
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

		let authMdleware = function (req, res, next) {
  	// 		const token = req.headers["x-access-token"] || req.headers["authorization"]
			// //if no token found, return response (without going to the next middelware)
			// if (!token) {
			// 	return res.status(401).send({sucess:false,msg:'Access denied. No token provided.'})
			// }

			// try {
			// 	//decode basic auth
			//     const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
			//     const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
			//     console.log(login, password)
			//     if (login && password && login === auth.login && password === auth.password) {
			// 	    next();
			// 	}

			// } catch (ex) {
			//     //if invalid token
			//     return res.status(400).send({sucess:false,msg:'Invalid token.'})
			// }
  			next();
		}

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
		    	
		    	const authenticated = await us.auth(email,pwd)
		    	if(authenticated === null){
			    	res.send({sucess:false,msg:"Email ou senha invalidos"});
			    }else{
			    	res.send({sucess:true,msg:"Autenticado com sucesso, usa token no authorization para acessar metodos que precisao de auth",
			    			  token: us.generateApiToken(email,pwd)});
			    }
		    }
		})

		//auth
		this._app.getServer().post('/vote', authMdleware,async  (req, res) => {
			
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
		this._app.getServer().get('/restaurant_voted_today', authMdleware,async  (req, res) => {
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