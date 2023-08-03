import { Router } from 'express';
import teams from './TeamsRouter';
import login from './LoginRouter';
import match from './MatchesRouter';

const router = Router();

router.use('/teams', teams);
router.use('/login', login);
router.use('/matches', match);

export default router;
