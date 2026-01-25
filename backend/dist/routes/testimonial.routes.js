import { Router } from 'express';
import * as miscController from '../controllers/misc.controller.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { Testimonial } from '../models/index.js';
const router = Router();
router.get('/', miscController.getTestimonials);
router.post('/', authenticate, requireAdmin, miscController.createTestimonial);
router.put('/:id', authenticate, requireAdmin, miscController.updateItem(Testimonial));
router.delete('/:id', authenticate, requireAdmin, miscController.deleteItem(Testimonial));
export default router;
//# sourceMappingURL=testimonial.routes.js.map