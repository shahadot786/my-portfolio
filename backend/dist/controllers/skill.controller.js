import { SkillCategory } from '../models/index.js';
import { ApiError } from '../middleware/error.js';
export const getAllSkillCategories = async (_req, res, next) => {
    try {
        const categories = await SkillCategory.find().sort({ order: 1 });
        res.status(200).json({ success: true, categories });
    }
    catch (error) {
        next(error);
    }
};
export const createSkillCategory = async (req, res, next) => {
    try {
        const category = await SkillCategory.create(req.body);
        res.status(201).json({ success: true, category });
    }
    catch (error) {
        next(error);
    }
};
export const updateSkillCategory = async (req, res, next) => {
    try {
        const category = await SkillCategory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!category) {
            throw new ApiError('Category not found', 404);
        }
        res.status(200).json({ success: true, category });
    }
    catch (error) {
        next(error);
    }
};
export const deleteSkillCategory = async (req, res, next) => {
    try {
        const category = await SkillCategory.findByIdAndDelete(req.params.id);
        if (!category) {
            throw new ApiError('Category not found', 404);
        }
        res.status(200).json({ success: true, message: 'Category deleted' });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=skill.controller.js.map