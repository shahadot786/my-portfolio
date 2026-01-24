import { Router } from 'express';
import * as pageController from '../controllers/page.controller.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', pageController.getAllPages);
router.get('/:slug', pageController.getPage);
router.put('/:slug', authenticate, requireAdmin, pageController.updatePage);

export default router;
