import should from 'should'
import request from 'request'
import { expect,assert } from 'chai';
import db from "../models/index.js"
import PollRestaurantSercive from "../services/poll_restaurant_service.js";
import moment from 'moment'
// 
describe("Testando o serviço de Restaurant - PollRestaurantSercive",function(){
  let transact
  beforeEach(async function() {
    await db.sequelize.authenticate()
    // transact = await db.sequelize.transaction();
    // console.log(transact)
    // transact.commit()
    // transact.rollback()
  });

  it("Testando Votar - sem voto",async function(){
    let prs = new PollRestaurantSercive(db)
    let employeeId = 3
    let restaurantId = 7

    const voteResult = await prs.vote(employeeId,restaurantId)
    // console.log('Resultado do voto',voteResult)
    expect(voteResult).to.be.true //true voto realizado
   })

   it("Testando Calcula restaurante do dia",async function(){
    let prs = new PollRestaurantSercive(db)
    
    // const tomorrow = moment().add(1,'days')
    const today = moment()
    const calculated = await prs.calculateRestaurantMostVotedToday(today)
    // console.log('Ja sabemos aonde vamos almoçar hoje!', calculated) //false ja foi realizado
    expect(calculated).to.equal(true); //true calculo realizado com sucesso

   })

  it("Testando restaurante ganhador do dia",async function(){
    let prs = new PollRestaurantSercive(db)
    const restaurantWinner = await prs.restaurantVotedToday()
    expect(restaurantWinner).to.be.an.instanceof(db.sequelize.models.RestaurantVotes)
  })

  afterEach(async function () {
    // await 
    // transact.rollback()
  });

});