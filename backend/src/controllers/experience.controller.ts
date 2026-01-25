import { Request, Response, NextFunction } from 'express';
import { Experience } from '../models/index.js';
import { ApiError } from '../middleware/error.js';

export const getAllExperiences = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, period: -1 });
    res.status(200).json({ success: true, experiences });
  } catch (error) {
    next(error);
  }
};

export const createExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, experience });
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!experience) {
      throw new ApiError('Experience not found', 404);
    }
    res.status(200).json({ success: true, experience });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      throw new ApiError('Experience not found', 404);
    }
    res.status(200).json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    next(error);
  }
};

export const reorderExperiences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orders } = req.body; // Array of { id: string, order: number }
    if (!Array.isArray(orders)) {
      throw new ApiError('Orders must be an array', 400);
    }

    const updates = orders.map((item) =>
      Experience.findByIdAndUpdate(item.id, { order: item.order })
    );
    await Promise.all(updates);

    res.status(200).json({ success: true, message: 'Reordered successfully' });
  } catch (error) {
    next(error);
  }
};
