import { Request, Response, NextFunction } from 'express';
import { Testimonial, Education, Certificate } from '../models/index.js';
import { ApiError } from '../middleware/error.js';

// Testimonials
export const getTestimonials = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    res.status(200).json({ success: true, testimonials });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, testimonial });
  } catch (error) {
    next(error);
  }
};

// Education
export const getEducation = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const education = await Education.find().sort({ order: 1 });
    res.status(200).json({ success: true, education });
  } catch (error) {
    next(error);
  }
};

export const createEducation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({ success: true, education });
  } catch (error) {
    next(error);
  }
};

// Certificates
export const getCertificates = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const certificates = await Certificate.find().sort({ verified: -1, order: 1 });
    res.status(200).json({ success: true, certificates });
  } catch (error) {
    next(error);
  }
};

export const createCertificate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const certificate = await Certificate.create(req.body);
    res.status(201).json({ success: true, certificate });
  } catch (error) {
    next(error);
  }
};

// ... Similar update/delete for all
export const deleteItem = (Model: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) throw new ApiError('Not found', 404);
    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    next(error);
  }
};

export const updateItem = (Model: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) throw new ApiError('Not found', 404);
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};
