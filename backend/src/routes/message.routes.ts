import { Router } from 'express';
import * as messageController from '../controllers/message.controller.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', messageController.submitMessage);
router.get('/', authenticate, requireAdmin, messageController.getAllMessages);
router.put('/:id', authenticate, requireAdmin, messageController.updateMessageStatus);
router.delete('/:id', authenticate, requireAdmin, messageController.deleteMessage);

export default router;
