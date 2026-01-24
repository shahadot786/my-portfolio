import { Router } from 'express';
import * as projectController from '../controllers/project.controller.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
const router = Router();
router.get('/', projectController.getAllProjects);
router.post('/', authenticate, requireAdmin, projectController.createProject);
router.put('/:id', authenticate, requireAdmin, projectController.updateProject);
router.delete('/:id', authenticate, requireAdmin, projectController.deleteProject);
export default router;
//# sourceMappingURL=project.routes.js.map