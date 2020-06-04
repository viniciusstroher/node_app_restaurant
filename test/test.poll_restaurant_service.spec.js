import should from 'should'
import request from 'request'
import { expect,assert } from 'chai';
import db from "../models/index.js"
import PollRestaurantSercive from "../services/poll_restaurant_service.js";
import moment from 'moment'

describe("Testando o serviço de Voto - PollRestaurantSercive",function(){
  beforeEach(async function() {
    await db.sequelize.authenticate()
    let now = moment()   
  });

  it("Testando Votar - sem voto",async function(){
    let prs = new PollRestaurantSercive(db)
    let employeeId = 1
    let restaurantId = 2

    const voteResult = await prs.vote(employeeId,restaurantId)
    console.log('Resultado do voto',voteResult)
    expect(voteResult).to.be.true //true voto realizado
   })

   it("Testando Calcula restaurante do dia",async function(){
    let prs = new PollRestaurantSercive(db)
    
    const calculated = await prs.calculateRestaurantMostVotedToday()
    //pegar novo restaurante do dia
    expect(calculated).to.equal(true); //true calculo realizado

   })

  afterEach(function () {
       
  });

});