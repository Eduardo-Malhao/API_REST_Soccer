import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesSequelize from '../database/models/MatchesSequelize';
import MatchesModel from '../model/MatchesModel';
import { token, allMatchesMock, allFinishedMatchesMock, allOnGoingMatchesMock} from './mocks/MatchesMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
    afterEach(sinon.restore);
  
    it('findAll', async function() {
      sinon.stub(MatchesSequelize, 'findAll').resolves(allMatchesMock as any);
      const { status, body } = await chai.request(app).get('/matches');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(allMatchesMock);
    });
  
    it('OnGoingMatches', async function() {
      sinon.stub(MatchesSequelize, 'findAll').resolves(allOnGoingMatchesMock as any);
      const { status, body } = await chai.request(app).get('/matches?inProgress=true');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(allOnGoingMatchesMock);
    });

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
