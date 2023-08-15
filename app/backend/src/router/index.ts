import { Router } from 'express';
import teams from './TeamsRouter';
import login from './LoginRouter';
import match from './MatchesRouter';
import leaderboard from './LeaderboardRouter';

const router = Router();

router.use('/teams', teams);
router.use('/login', login);
router.use('/matches', match);
router.use('/leaderboard', leaderboard);

export default router;
