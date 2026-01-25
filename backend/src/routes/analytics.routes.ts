import { Router } from 'express';
import * as analyticsController from '../controllers/analytics.controller.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/track', analyticsController.trackVisit);
router.get('/stats', authenticate, requireAdmin, analyticsController.getStats);

export default router;
