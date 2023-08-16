import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesSequelize from '../database/models/MatchesSequelize';
import TeamsSequelize from '../database/models/TeamsSequelize';

import MatchesModel from '../model/MatchesModel';
import JwtUtils from '../utils/jwtUtils';

import { newMatchBodyMock, matchesMock, newMatchMock, allOnGoingMatchesMock, token} from './mocks/MatchesMock';
import { teamsMock } from './mocks/TeamsMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
    afterEach(sinon.restore);
  
    it('findAll', async function() {
      sinon.stub(MatchesSequelize, 'findAll').resolves(matchesMock as any);
      const { status, body } = await chai.request(app).get('/matches');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchesMock);
    });
  
    it('OnGoingMatches', async function() {
      sinon.stub(MatchesSequelize, 'findAll').resolves(allOnGoingMatchesMock as any);
      const { status, body } = await chai.request(app).get('/matches?inProgress=true');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(allOnGoingMatchesMock);
    });

    it('Create', async function() {
      const DB = MatchesSequelize.build(newMatchMock as any);
  
      sinon.stub(JwtUtils, 'verify').resolves({ id: 1 } as any);
      sinon.stub(MatchesSequelize, 'create').resolves(DB as any);

      const teamsSequelizeFindByPkStub = sinon.stub(TeamsSequelize, 'findByPk');
      teamsSequelizeFindByPkStub.onCall(0).resolves(teamsMock[0] as any);
      teamsSequelizeFindByPkStub.onCall(1).resolves(teamsMock[1] as any);
      
      const { status, body } = await chai.request(app).post('/matches')
      .set('Authorization', token)
      .send(newMatchBodyMock);
  
      expect(status).to.equal(201);
      expect(body).to.deep.equal(newMatchMock);
    })

    it('should finish a match', async () => {
        const updateStub = sinon.stub(MatchesSequelize, 'update').resolves(1 as any);
    
        const matchesModel = new MatchesModel();
        await matchesModel.finishMatch(1);
    
        expect(updateStub.calledOnceWithExactly({ inProgress: false }, { where: { id: 1 } })).to.be.true;
    });

    it('should update a match', async () => {
        const updateStub = sinon.stub(MatchesSequelize, 'update').resolves(1 as any);
    
        const matchesModel = new MatchesModel();
        await matchesModel.updateMatch(1, 1, 1);
    
        expect(updateStub.calledOnceWithExactly({ homeTeamGoals: 1, awayTeamGoals: 1 }, { where: { id: 1 } })).to.be.true;
    });

    it('should create a new match', async () => {
        const createStub = sinon.stub(MatchesSequelize, 'create').resolves({
          dataValues: {
            id: 1,
            homeTeamId: 1,
            awayTeamId: 2,
            homeTeamGoals: 2,
            awayTeamGoals: 1,
            inProgress: true,
          },
        } as any);
    
        const matchesModel = new MatchesModel();
        const response = await matchesModel.create(1, 2, 2, 1);
    
        expect(createStub.calledOnceWithExactly({
          homeTeamId: 1,
          awayTeamId: 2,
          homeTeamGoals: 2,
          awayTeamGoals: 1,
          inProgress: true,
        })).to.be.true;
    
        expect(response).to.deep.equal({
          id: 1,
          homeTeamId: 1,
          awayTeamId: 2,
          homeTeamGoals: 2,
          awayTeamGoals: 1,
          inProgress: true,
        });
      });
});
