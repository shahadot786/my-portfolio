import { Router } from 'express';
import * as skillController from '../controllers/skill.controller.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
const router = Router();
router.get('/', skillController.getAllSkillCategories);
router.post('/', authenticate, requireAdmin, skillController.createSkillCategory);
router.put('/:id', authenticate, requireAdmin, skillController.updateSkillCategory);
router.delete('/:id', authenticate, requireAdmin, skillController.deleteSkillCategory);
export default router;
//# sourceMappingURL=skill.routes.js.map