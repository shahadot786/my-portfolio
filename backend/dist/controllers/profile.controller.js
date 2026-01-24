import { Profile } from '../models/index.js';
import { ApiError } from '../middleware/error.js';
export const getProfile = async (_req, res, next) => {
    try {
        const profile = await Profile.findOne().sort({ createdAt: -1 });
        if (!profile) {
            throw new ApiError('Profile not found', 404);
        }
        res.status(200).json({ success: true, profile });
    }
    catch (error) {
        next(error);
    }
};
export const updateProfile = async (req, res, next) => {
    try {
        let profile = await Profile.findOne().sort({ createdAt: -1 });
        if (profile) {
            profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
                new: true,
                runValidators: true,
            });
        }
        else {
            profile = await Profile.create(req.body);
        }
        res.status(200).json({ success: true, profile });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=profile.controller.js.map