import { Request, Response, Router } from 'express';
import TokenValidation from '../middleware/TokenValidation';
import LeaderboardController from '../controller/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  TokenValidation.validateToken,
  (req: Request, res: Response) => leaderboardController.getAllInfo(req, res),
);

export default router;
