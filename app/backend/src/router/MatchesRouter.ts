import { Request, Response, Router } from 'express';
import MatchesController from '../controller/MatchesController';
import TokenValidation from '../middleware/TokenValidation';
import MatchValidation from '../middleware/MatchValidation';

const matchesController = new MatchesController();

const router = Router();

router.patch(
  '/:id/finish',
  TokenValidation.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);
router.patch(
  '/:id',
  TokenValidation.validateToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);
router.get('/', (req: Request, res: Response) => matchesController.findMatchByProgress(req, res));
router.post(
  '/',
  TokenValidation.validateToken,
  MatchValidation.validateMatch,
  (req: Request, res: Response) => matchesController.create(req, res),
);

export default router;
