import { Analytics } from '../models/index.js';
// import { ApiError } from '../middleware/error.js';
export const trackVisit = async (req, res, next) => {
    try {
        const { path } = req.body;
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        let analytics = await Analytics.findOne({ date });
        if (!analytics) {
            analytics = new Analytics({
                date,
                pageViews: 1,
                uniqueVisitors: 1, // simplified for now
                topPages: [{ path, views: 1 }]
            });
        }
        else {
            analytics.pageViews += 1;
            const pageIndex = analytics.topPages.findIndex(p => p.path === path);
            if (pageIndex > -1) {
                analytics.topPages[pageIndex].views += 1;
            }
            else {
                analytics.topPages.push({ path, views: 1 });
            }
        }
        await analytics.save();
        res.status(200).json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
export const getStats = async (_req, res, next) => {
    try {
        const stats = await Analytics.find()
            .sort({ date: -1 })
            .limit(30); // Last 30 days
        const totals = await Analytics.aggregate([
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: '$pageViews' },
                    totalUnique: { $sum: '$uniqueVisitors' }
                }
            }
        ]);
        res.status(200).json({
            success: true,
            stats,
            totals: totals[0] || { totalViews: 0, totalUnique: 0 }
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=analytics.controller.js.map