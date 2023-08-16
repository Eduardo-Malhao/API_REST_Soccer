import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import TeamsSequelize from '../database/models/TeamsSequelize';
import { oneTeamMock, allTeamsMock } from './mocks/TeamsMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teams', () => {
  afterEach(sinon.restore);

  it('findAll', async function() {
    sinon.stub(TeamsSequelize, 'findAll').resolves(allTeamsMock as any);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allTeamsMock);
  });

  it('findById', async function() {
    sinon.stub(TeamsSequelize, 'findByPk').resolves(oneTeamMock as any);
    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(oneTeamMock);
  });

  // it('Not Found', async function() {
  //   sinon.stub(TeamsSequelize, 'findByPk').resolves(null);
  //   const { status, body } = await chai.request(app).get('/teams/100');

  //   expect(status).to.equal(404);
  //   expect(body.message).to.equal('Team not found');
  // });

});