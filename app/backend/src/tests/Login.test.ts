import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserSequelize from '../database/models/UsersSequelize';
import { userMock, userToken } from './mocks/LoginMock';

import { Response } from 'superagent';
import UsersSequelize from '../database/models/UsersSequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
    afterEach(sinon.restore);
  
    it('login', async function() {
        const body = {
            email: 'user@user.com',
            password: 'secret_user',
          }
          const UserModel = new UserSequelize();
        //   const DB = UserModel.build(userMock);
          sinon.stub(UsersSequelize, 'findOne').resolves(userMock as any);
          const response = await chai.request(app).post('/login').send(body);
          expect(response.status).to.equal(200);
          expect(response.body).to.have.key('token');
    });
});
