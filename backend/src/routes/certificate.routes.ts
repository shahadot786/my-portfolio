import { Router } from 'express';
import * as miscController from '../controllers/misc.controller.js';
import { authenticate } from '../middleware/auth.js';
import { Certificate } from '../models/index.js';

const router = Router();

router.get('/', miscController.getCertificates);
router.post('/', authenticate, miscController.createCertificate);
router.put('/:id', authenticate, miscController.updateItem(Certificate));
router.delete('/:id', authenticate, miscController.deleteItem(Certificate));

export default router;
