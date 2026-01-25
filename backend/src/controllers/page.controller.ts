import { Request, Response, NextFunction } from 'express';
import { Page } from '../models/index.js';
import { ApiError } from '../middleware/error.js';

export const getPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ slug });
    
    if (!page) {
      throw new ApiError('Page content not found', 404);
    }

    res.status(200).json({ success: true, page });
  } catch (error) {
    next(error);
  }
};

export const getAllPages = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const pages = await Page.find().sort({ slug: 1 });
    res.status(200).json({ success: true, pages });
  } catch (error) {
    next(error);
  }
};

export const updatePage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const updateData = req.body;

    const page = await Page.findOneAndUpdate(
      { slug },
      updateData,
      { new: true, runValidators: true, upsert: true } // Create if not exists
    );

    res.status(200).json({ success: true, page });
  } catch (error) {
    next(error);
  }
};
