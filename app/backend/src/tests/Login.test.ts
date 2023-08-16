import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserSequelize from '../database/models/UsersSequelize';
import { userBody, userMock } from './mocks/LoginMock';

import { Response } from 'superagent';
import UsersSequelize from '../database/models/UsersSequelize';
import { token } from './mocks/MatchesMock';
import JwtUtils from '../utils/jwtUtils';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
    afterEach(sinon.restore);
  it('Controller Login Success', async function () {
    const DB = UsersSequelize.build(userMock);
    sinon.stub(UserSequelize, 'findOne').resolves(DB);

    const { status, body } = await chai.request(app).post('/login').send(userBody);

    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  })

  it('Controller Login Role Success', async function () {
    const DB = UsersSequelize.build(userMock);
    sinon.stub(UserSequelize, 'findOne').resolves(DB);
    sinon.stub(JwtUtils, 'verify').resolves({ id: 2 } as any);

    const { status, body } = await chai.request(app).get('/login/role').set('Authorization', token);

    expect(status).to.equal(200);
    expect(body).to.have.key('role');
  })
});
