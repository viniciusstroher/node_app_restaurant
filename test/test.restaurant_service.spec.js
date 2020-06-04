import should from 'should'
import request from 'request'
import { expect,assert } from 'chai';
import db from "../models/index.js"
import RestaurantService from "../services/restaurant_service.js";
import moment from 'moment'
import Logger from '../lib/logger.js'

describe("Testando o serviço de Restaurante - RestaurantService",function(){
  let transact
  beforeEach(async function() {
    await db.sequelize.authenticate()
    transact = await db.sequelize.transaction();
    // transact.commit()
    // transact.rollback()
  });

  it("Testando o serviço de Restaurante - criar restaurante",async function(){
    let rs = new RestaurantService(db)
    let employeeId = 1
    let name = 'Xis da 15'

    const restaurantResult = await rs.create(name,employeeId)
    // console.log('Resultado do restaurante',restaurantResult)
    
    expect(restaurantResult).to.be.an.instanceof(db.sequelize.models.Restaurant)
    // expect(restaurantResult).to.be.an('array')
    // expect(restaurantResult).to.have.length.above(0);
   })


   it("Testando o serviço de Restaurante - lista restaurante",async function(){
    let rs = new RestaurantService(db)
    const restaurantResult = await rs.getList()
    // console.log('Resultado da listagem de restaurante',restaurantResult)
    expect(restaurantResult).to.be.an('array')
   })



  afterEach(async function () {
      // await 
      // transact.rollback()
  });

});