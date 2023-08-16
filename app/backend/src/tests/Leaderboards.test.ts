import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesSequelize from '../database/models/MatchesSequelize';
import TeamsSequelize from '../database/models/TeamsSequelize';

import { allTeamsMock } from './mocks/TeamsMock';
import { allFinishedMatchesMock } from './mocks/MatchesMock';
import { AllMock, AwayMock, HomeMock } from './mocks/LeaderboardsMock';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  afterEach(sinon.restore);

  it('Home', async function () {
    const teamsDB = allTeamsMock.map((team) => TeamsSequelize.build(team));
    // const matchesDB = allFinishedMatchesMock.map((match) => TeamsSequelize.build(match));
  
    sinon.stub(TeamsSequelize, 'findAll').resolves(teamsDB as any);
    sinon.stub(MatchesSequelize, 'findAll').resolves(allFinishedMatchesMock as any);
    
    const { status, body } = (await chai.request(app).get('/leaderboard/home').send());

    expect(status).to.equal(200);
    expect(body).to.deep.equal(HomeMock);
  });

  it('Away', async function () {
    const teamsDB = allTeamsMock.map((team) => TeamsSequelize.build(team));
    // const matchesDB = allFinishedMatchesMock.map((match) => TeamsSequelize.build(match));
  
    sinon.stub(TeamsSequelize, 'findAll').resolves(teamsDB as any);
    sinon.stub(MatchesSequelize, 'findAll').resolves(allFinishedMatchesMock as any);
    
    const { status, body } = (await chai.request(app).get('/leaderboard/away').send());

    expect(status).to.equal(200);
    expect(body).to.deep.equal(AwayMock);
  });

  it('All', async function () {
    const teamsDB = allTeamsMock.map((team) => TeamsSequelize.build(team));
    // const matchesDB = allFinishedMatchesMock.map((match) => TeamsSequelize.build(match));
  
    sinon.stub(TeamsSequelize, 'findAll').resolves(teamsDB as any);
    sinon.stub(MatchesSequelize, 'findAll').resolves(allFinishedMatchesMock as any);
    
    const { status, body } = (await chai.request(app).get('/leaderboard').send());

    expect(status).to.equal(200);
    expect(body).to.deep.equal(AllMock);
  });
});
