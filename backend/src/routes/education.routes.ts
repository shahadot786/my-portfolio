import { Router } from 'express';
import * as miscController from '../controllers/misc.controller.js';
import { authenticate } from '../middleware/auth.js';
import { Education } from '../models/index.js';

const router = Router();

router.get('/', miscController.getEducation);
router.post('/', authenticate, miscController.createEducation);
router.put('/:id', authenticate, miscController.updateItem(Education));
router.delete('/:id', authenticate, miscController.deleteItem(Education));

export default router;
