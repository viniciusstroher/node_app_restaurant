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

  it("Testando o serviço de Restaurante - N:N restaurant -> employee",async function(){
    // let rs = new RestaurantService(db)
    // let employeeId = 1
    // let name = 'Xis da 15'

    //N:N - pivot
    const opt = {include:[{model:db.sequelize.models.Employee, as:'Employee'}]}
    const restaurant = await db.sequelize.models.Restaurant.findByPk(1,opt)
    console.log(restaurant.Employee[0].firstName)


    // const restaurantResult = await rs.create(name,employeeId)
    // console.log('Resultado do restaurante',restaurantResult)
    
    // expect(restaurantResult).to.be.an.instanceof(db.sequelize.models.Restaurant)
    // expect(restaurantResult).to.be.an('array')
    // expect(restaurantResult).to.have.length.above(0);
  })

  it("Testando o serviço de Restaurante - N:N employee -> restaurant",async function(){
    // let rs = new RestaurantService(db)
    // let employeeId = 1
    // let name = 'Xis da 15'

    //N:N - pivot
    const opt = {include:[{model:db.sequelize.models.Restaurant, as:'Restaurant'}]}
    const employee = await db.sequelize.models.Employee.findByPk(1,opt)
    console.log(employee.Restaurant[0].name)

    
    // const restaurantResult = await rs.create(name,employeeId)
    // console.log('Resultado do restaurante',restaurantResult)
    
    // expect(restaurantResult).to.be.an.instanceof(db.sequelize.models.Restaurant)
    // expect(restaurantResult).to.be.an('array')
    // expect(restaurantResult).to.have.length.above(0);
  })


  afterEach(async function () {
      // await 
      // transact.rollback()
  });

});