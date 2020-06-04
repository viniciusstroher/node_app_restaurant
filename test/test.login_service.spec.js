import should from 'should'
import request from 'request'
import { expect,assert } from 'chai';
import db from "../models/index.js"
import UserService from "../services/user_service.js";
import moment from 'moment'

describe("Testando o serviço de Usuario - UserService",function(){
  let transact
  beforeEach(async function() {
    await db.sequelize.authenticate()
    // transact = await db.sequelize.transaction();
    // transact.comit()
    // transact.rollback()
  });

  it("Testando o serviço de Usuario - authenticar",async function(){
    let us = new UserService(db)
    let email = 'example@example.com'
    let pwd = '123'

    const user = await us.auth(email,pwd)
    // console.log('Resultado da authenticacao',user)
    expect(user).to.be.an.instanceof(db.sequelize.models.Employee)

  })


  it("Testando o serviço de Usuario - gerar token",async function(){
    let us = new UserService(db)
    
    const token = await us.generateApiToken()
    // console.log('Tokene gerado',token)
    expect(token).to.be.an('string')
  })

  afterEach(async function () {
      // await 
      // transact.rollback()
  });

});