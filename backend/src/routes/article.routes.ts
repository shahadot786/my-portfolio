import { Router } from 'express';
import * as articleController from '../controllers/article.controller.js';
import { authenticate, requireAdmin, optionalAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', optionalAuth, articleController.getArticles);
router.get('/id/:id', authenticate, requireAdmin, articleController.getArticleById);
router.get('/:slug', optionalAuth, articleController.getArticleBySlug);
router.post('/scrape', authenticate, articleController.scrapeArticle);
router.post('/', authenticate, requireAdmin, articleController.createArticle);
router.put('/:id', authenticate, requireAdmin, articleController.updateArticle);
router.delete('/:id', authenticate, requireAdmin, articleController.deleteArticle);

export default router;
