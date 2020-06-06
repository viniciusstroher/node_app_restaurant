import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize'
import moment from 'moment'
export default class PollRestaurantService {
	constructor(db){
		this._db = db

	}

	async vote(employeeId,restaurantId){
		const models = this._db.sequelize.models
		let votedToday = await this.verifyDailyVote(employeeId)
		let restaurantVotedInWeek = await this.isRestaurantWinInWeek(restaurantId)
		if(!votedToday && !restaurantVotedInWeek){
			const returnCreate = await models.EmployeeRestaurantVote.create({ employeeId,restaurantId })
			return true
		}

		return false
	}

	async verifyDailyVote(employeeId){
		const Op = Sequelize.Op
		const models = this._db.sequelize.models
		const now = moment()
		const end = now.set("hour", "11").set("minute", "25")

		let where = {where:{
						[Op.and]:[
							{employeeId:employeeId}, 
							{createdAt: {
					            [Op.gt]: now.startOf('day').toDate(),
					            [Op.lt]: end.toDate()
					        }}
					    ]
					}}

		let countVote = await models.EmployeeRestaurantVote.count(where)
		return countVote > 0 ? true : false
	}

	async calculateRestaurantMostVotedToday(date){
		const Op = Sequelize.Op
		const models = this._db.sequelize.models
		const end = date.set("hour", "11").set("minute", "25")

        const query = {where:{createdAt: {
			            [Op.gt]: date.startOf('day').toDate(),
			            [Op.lt]: end.toDate()
			        }},
        		  	attributes: ['restaurantId',[this._db.sequelize.fn('COUNT',1), 'count']],
		    	  	group: ['restaurantId'],
		    	  	order: [[this._db.sequelize.fn('COUNT', 1), 'DESC']]}

		let countVote = await models.EmployeeRestaurantVote.findAll(query)
		let anyRestaurantVotedToday = await this.isAnyRestaurantVotedToday()
		
		if(countVote.length > 0 && !anyRestaurantVotedToday){
			await models.RestaurantVotes.create({restaurantId:countVote[0].restaurantId})
			return true
		}
		return false
	}

	async restaurantVotedToday(){
		const Op = Sequelize.Op
		const models = this._db.sequelize.models
		const now = moment()
		const end = now.set("hour", "11").set("minute", "25")
		
		let where = {where: {
				[Op.and]:[
					{restaurantId:restaurantId}, 
					{createdAt: {
			            [Op.gt]: now.startOf('day').toDate(),
			            [Op.lt]: end.toDate()
			        }}
			    ]
	    	}
	    }

		let countRestaurantVotedWeek = await models.RestaurantVotes.findOne(where)
		return countRestaurantVotedWeek
	}

	async isRestaurantWinInWeek(restaurantId){
		const Op = Sequelize.Op
		const models = this._db.sequelize.models
		const now = moment()
		
		let where = {where: {
				[Op.and]:[
					{restaurantId:restaurantId}, 
					{createdAt: {
			            [Op.gt]: now.startOf('week').toDate(),
			            [Op.lt]: now.endOf('week').toDate()
			        }}
			    ]
	    	}
	    }
		
		let countRestaurantVotedWeek = await models.RestaurantVotes.count(where)
		return countRestaurantVotedWeek > 0 ? true : false
	}

	async isAnyRestaurantVotedToday(){
		const Op = Sequelize.Op
		const models = this._db.sequelize.models
		const now = moment()
		const end = now.set("hour", "11").set("minute", "25")
		
		let where = {where: {createdAt: {
            [Op.gt]: now.startOf('day').toDate(),
            [Op.lt]: end.toDate()
        }}}

		let countRestaurantVotedWeek = await models.RestaurantVotes.count(where)
		return countRestaurantVotedWeek > 0 ? true : false
	}


	async restaurantVotedToday(){
		const Op = Sequelize.Op
		const models = this._db.sequelize.models
		const now = moment()
		const end = now.set("hour", "11").set("minute", "25")
		
		let where = {where: {createdAt: {
			// pegar de
            [Op.gt]: now.startOf('day').toDate(),
            [Op.lt]: end.toDate()
        }}}

		let countRestaurantVotedWeek = await models.RestaurantVotes.findOne(where)
		return countRestaurantVotedWeek
	}

	async getRestaurant(id){
		const Op = Sequelize.Op
		const models = this._db.sequelize.models

		let restaurant = await models.Restaurant.findByPk(id)
		return restaurant
	}
}