import { Router } from 'express';
import * as profileController from '../controllers/profile.controller.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
const router = Router();
router.get('/', profileController.getProfile);
router.put('/', authenticate, requireAdmin, profileController.updateProfile);
export default router;
//# sourceMappingURL=profile.routes.js.map