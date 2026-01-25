import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/index.js';
import { ApiError } from '../middleware/error.js';

export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: any = {};
    if (req.query.featured === 'true') {
      query.featured = true;
    }

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, projects });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      throw new ApiError('Project not found', 404);
    }
    res.status(200).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      throw new ApiError('Project not found', 404);
    }
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};
