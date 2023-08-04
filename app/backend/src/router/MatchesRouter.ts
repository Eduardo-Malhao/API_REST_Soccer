import { Request, Response, Router } from 'express';
import MatchesController from '../controller/MatchesController';
import TokenValidation from '../middleware/TokenValidation';

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
router.get('/', (req: Request, res: Response) => matchesController.findAll(req, res));
router.get('/', (req: Request, res: Response) => matchesController.findInProgress(req, res));
router.get('/', (req: Request, res: Response) => matchesController.findFinished(req, res));

export default router;
