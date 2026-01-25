import { Request, Response, NextFunction } from 'express';
import { Article } from '../models/index.js';
import { ApiError } from '../middleware/error.js';
import { scrapeMediumMeta } from '../utils/scraper.js';

export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const query: any = {};
    
    if (!isAdmin) {
      query.published = true;
    }

    const { category, search, page = 1, limit = 10 } = req.query;
    
    if (category) {
      query.categories = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const articles = await Article.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('author', 'name');

    const total = await Article.countDocuments(query);

    res.status(200).json({
      success: true,
      articles,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getArticleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'name');

    if (!article) {
      throw new ApiError('Article not found', 404);
    }

    res.status(200).json({ success: true, article });
  } catch (error) {
    next(error);
  }
};

export const getArticleBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const article = await Article.findOne({ slug: req.params.slug }).populate('author', 'name');

    if (!article) {
      throw new ApiError('Article not found', 404);
    }

    if (!article.published && !isAdmin) {
      throw new ApiError('Article not published', 403);
    }

    // Increment views (optional async)
    article.views += 1;
    await article.save();

    res.status(200).json({ success: true, article });
  } catch (error) {
    next(error);
  }
};

export const createArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new ApiError('Not authenticated', 401);
    
    const articleData = { ...req.body, author: req.user.userId };

    // Auto-scrape Medium meta if type is medium
    if (articleData.type === 'medium' && articleData.externalUrl) {
      const meta = await scrapeMediumMeta(articleData.externalUrl);
      if (meta.title && !articleData.title) articleData.title = meta.title;
      if (meta.excerpt && !articleData.excerpt) articleData.excerpt = meta.excerpt;
      if (meta.thumbnail && !articleData.thumbnail) articleData.thumbnail = meta.thumbnail;
    }

    const article = await Article.create(articleData);
    
    res.status(201).json({ success: true, article });
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articleData = { ...req.body };

    // Auto-scrape Medium meta if type is medium and externalUrl changed or titles/excerpts are missing
    if (articleData.type === 'medium' && articleData.externalUrl) {
      const meta = await scrapeMediumMeta(articleData.externalUrl);
      if (meta.title && !articleData.title) articleData.title = meta.title;
      if (meta.excerpt && !articleData.excerpt) articleData.excerpt = meta.excerpt;
      if (meta.thumbnail && !articleData.thumbnail) articleData.thumbnail = meta.thumbnail;
    }

    const article = await Article.findByIdAndUpdate(req.params.id, articleData, {
      new: true,
      runValidators: true,
    });
    if (!article) {
      throw new ApiError('Article not found', 404);
    }
    res.status(200).json({ success: true, article });
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      throw new ApiError('Article not found', 404);
    }
    res.status(200).json({ success: true, message: 'Article deleted' });
  } catch (error) {
    next(error);
  }
};

export const scrapeArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body;
    if (!url) throw new ApiError('URL is required', 400);
    const meta = await scrapeMediumMeta(url);
    res.status(200).json({ success: true, meta });
  } catch (error) {
    next(error);
  }
};
