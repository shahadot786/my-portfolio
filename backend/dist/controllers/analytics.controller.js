import { Analytics } from '../models/index.js';
import { UAParser } from 'ua-parser-js';
import geoip from 'geoip-lite';
// import { ApiError } from '../middleware/error.js';
export const trackVisit = async (req, res, next) => {
    try {
        const { path, type = 'view', url, language, screen } = req.body;
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        let analytics = await Analytics.findOne({ date });
        if (!analytics) {
            analytics = new Analytics({
                date,
                pageViews: 0,
                uniqueVisitors: 0,
                topPages: [],
                clicks: [],
                browsers: [],
                os: [],
                devices: [],
                locations: [],
                referrers: [],
                languages: [],
                screens: []
            });
        }
        if (type === 'view') {
            analytics.pageViews += 1;
            analytics.uniqueVisitors += 1;
            const pageIndex = analytics.topPages.findIndex(p => p.path === path);
            if (pageIndex > -1) {
                analytics.topPages[pageIndex].views += 1;
            }
            else {
                analytics.topPages.push({ path, views: 1 });
            }
            // Track Referrer
            const rawReferrer = req.headers['referer'] || req.headers['referrer'] || 'Direct';
            let referrer = 'Direct';
            try {
                if (rawReferrer && typeof rawReferrer === 'string' && rawReferrer !== 'Direct') {
                    const urlObj = new URL(rawReferrer);
                    referrer = urlObj.hostname || 'Direct';
                }
            }
            catch (e) {
                referrer = 'Direct';
            }
            const refIndex = analytics.referrers.findIndex(r => r.name === referrer);
            if (refIndex > -1)
                analytics.referrers[refIndex].count += 1;
            else
                analytics.referrers.push({ name: referrer, count: 1 });
            // Parse UA
            const userAgent = req.headers['user-agent'] || '';
            const parser = new UAParser(userAgent);
            const browserName = parser.getBrowser().name || 'Unknown';
            const osName = parser.getOS().name || 'Unknown';
            const deviceType = parser.getDevice().type || 'Desktop'; // Default to desktop if undefined
            // Update Browser
            const browserIndex = analytics.browsers.findIndex(b => b.name === browserName);
            if (browserIndex > -1)
                analytics.browsers[browserIndex].count += 1;
            else
                analytics.browsers.push({ name: browserName, count: 1 });
            // Update OS
            const osIndex = analytics.os.findIndex(o => o.name === osName);
            if (osIndex > -1)
                analytics.os[osIndex].count += 1;
            else
                analytics.os.push({ name: osName, count: 1 });
            // Update Device
            const deviceIndex = analytics.devices.findIndex(d => d.name === deviceType);
            if (deviceIndex > -1)
                analytics.devices[deviceIndex].count += 1;
            else
                analytics.devices.push({ name: deviceType, count: 1 });
            // Parse IP
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
            const geo = geoip.lookup(ip.split(',')[0].trim());
            if (geo) {
                const country = geo.country || 'Unknown';
                const city = geo.city || 'Unknown';
                const locIndex = analytics.locations.findIndex(l => l.country === country && l.city === city);
                if (locIndex > -1)
                    analytics.locations[locIndex].count += 1;
                else
                    analytics.locations.push({ country, city, count: 1 });
            }
            // Track Language
            if (language) {
                const langIndex = analytics.languages.findIndex(l => l.name === language);
                if (langIndex > -1)
                    analytics.languages[langIndex].count += 1;
                else
                    analytics.languages.push({ name: language, count: 1 });
            }
            // Track Screen
            if (screen) {
                const screenIndex = analytics.screens.findIndex(s => s.name === screen);
                if (screenIndex > -1)
                    analytics.screens[screenIndex].count += 1;
                else
                    analytics.screens.push({ name: screen, count: 1 });
            }
        }
        else if (type === 'click' && url) {
            const clickIndex = analytics.clicks.findIndex(c => c.url === url);
            if (clickIndex > -1) {
                analytics.clicks[clickIndex].count += 1;
            }
            else {
                analytics.clicks.push({ url, count: 1 });
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
                    totalUnique: { $sum: '$uniqueVisitors' },
                    totalClicks: { $sum: { $size: '$clicks' } }
                }
            }
        ]);
        // Aggregate top clicked links across all days
        const topClicks = await Analytics.aggregate([
            { $unwind: '$clicks' },
            {
                $group: {
                    _id: '$clicks.url',
                    count: { $sum: '$clicks.count' }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        // Aggregate top browsers
        const topBrowsers = await Analytics.aggregate([
            { $unwind: '$browsers' },
            {
                $group: {
                    _id: '$browsers.name',
                    count: { $sum: '$browsers.count' }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        // Aggregate top OS
        const topOS = await Analytics.aggregate([
            { $unwind: '$os' },
            {
                $group: {
                    _id: '$os.name',
                    count: { $sum: '$os.count' }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        // Aggregate top countries
        const topLocations = await Analytics.aggregate([
            { $unwind: '$locations' },
            {
                $group: {
                    _id: '$locations.country',
                    count: { $sum: '$locations.count' }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);
        // Aggregate top referrers
        const topReferrers = await Analytics.aggregate([
            { $unwind: '$referrers' },
            {
                $group: {
                    _id: '$referrers.name',
                    count: { $sum: '$referrers.count' }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        res.status(200).json({
            success: true,
            stats,
            totals: totals[0] || { totalViews: 0, totalUnique: 0, totalClicks: 0 },
            topClicks: topClicks.map(c => ({ url: c._id, count: c.count })),
            topBrowsers: topBrowsers.map(b => ({ name: b._id, count: b.count })),
            topOS: topOS.map(o => ({ name: o._id, count: o.count })),
            topLocations: topLocations.map(l => ({ name: l._id, count: l.count })),
            topReferrers: topReferrers.map(r => ({ name: r._id, count: r.count })),
            topLanguages: (await Analytics.aggregate([
                { $unwind: '$languages' },
                { $group: { _id: '$languages.name', count: { $sum: '$languages.count' } } },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ])).map(l => ({ name: l._id, count: l.count })),
            topScreens: (await Analytics.aggregate([
                { $unwind: '$screens' },
                { $group: { _id: '$screens.name', count: { $sum: '$screens.count' } } },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ])).map(s => ({ name: s._id, count: s.count }))
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=analytics.controller.js.map