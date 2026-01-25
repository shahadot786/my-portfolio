import { Router } from 'express';
import * as experienceController from '../controllers/experience.controller.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', experienceController.getAllExperiences);
router.post('/', authenticate, requireAdmin, experienceController.createExperience);
router.put('/reorder', authenticate, requireAdmin, experienceController.reorderExperiences);
router.put('/:id', authenticate, requireAdmin, experienceController.updateExperience);
router.delete('/:id', authenticate, requireAdmin, experienceController.deleteExperience);

export default router;
