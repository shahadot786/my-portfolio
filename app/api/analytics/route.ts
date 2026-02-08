import { NextRequest, NextResponse } from 'next/server';
import { Analytics } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';
import { UAParser } from 'ua-parser-js';

// Note: geoip-lite might not work well in edge/serverless depending on deployment
// For now, we'll implement the logic, but if geoip-lite is too big, 
// we might need a different approach for country tracking in Vercel (using headers)

export const POST = withErrorHandling(async (req: NextRequest) => {
    const body = await req.json();
    const { path, type = 'view', url, language, screen } = body;

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

        const pageIndex = analytics.topPages.findIndex((p: { path: string }) => p.path === path);
        if (pageIndex > -1) {
            analytics.topPages[pageIndex].views += 1;
        } else {
            analytics.topPages.push({ path, views: 1 });
        }

        // Referrer tracking
        const referrer = req.headers.get('referer') || req.headers.get('referrer') || 'Direct';
        let referrerHost = 'Direct';
        try {
            if (referrer !== 'Direct') {
                const urlObj = new URL(referrer);
                referrerHost = urlObj.hostname;
            }
        } catch {
            referrerHost = 'Direct';
        }

        const refIndex = analytics.referrers.findIndex((r: { name: string }) => r.name === referrerHost);
        if (refIndex > -1) analytics.referrers[refIndex].count += 1;
        else analytics.referrers.push({ name: referrerHost, count: 1 });

        // UA Parsing
        const userAgent = req.headers.get('user-agent') || '';
        const parser = new UAParser(userAgent);
        const browserName = parser.getBrowser().name || 'Unknown';
        const osName = parser.getOS().name || 'Unknown';
        const deviceType = parser.getDevice().type || 'Desktop';

        const bIndex = analytics.browsers.findIndex((b: { name: string }) => b.name === browserName);
        if (bIndex > -1) analytics.browsers[bIndex].count += 1;
        else analytics.browsers.push({ name: browserName, count: 1 });

        const oIndex = analytics.os.findIndex((o: { name: string }) => o.name === osName);
        if (oIndex > -1) analytics.os[oIndex].count += 1;
        else analytics.os.push({ name: osName, count: 1 });

        const dIndex = analytics.devices.findIndex((d: { name: string }) => d.name === deviceType);
        if (dIndex > -1) analytics.devices[dIndex].count += 1;
        else analytics.devices.push({ name: deviceType, count: 1 });

        // Location (Vercel provides country header)
        const country = req.headers.get('x-vercel-ip-country') || 'Unknown';
        const city = req.headers.get('x-vercel-ip-city') || 'Unknown';

        const locIndex = analytics.locations.findIndex((l: { country: string; city: string }) => l.country === country && l.city === city);
        if (locIndex > -1) analytics.locations[locIndex].count += 1;
        else analytics.locations.push({ country, city, count: 1 });

        if (language) {
            const lIndex = analytics.languages.findIndex((l: { name: string }) => l.name === language);
            if (lIndex > -1) analytics.languages[lIndex].count += 1;
            else analytics.languages.push({ name: language, count: 1 });
        }

        if (screen) {
            const sIndex = analytics.screens.findIndex((s: { name: string }) => s.name === screen);
            if (sIndex > -1) analytics.screens[sIndex].count += 1;
            else analytics.screens.push({ name: screen, count: 1 });
        }

    } else if (type === 'click' && url) {
        const clickIndex = analytics.clicks.findIndex((c: { url: string }) => c.url === url);
        if (clickIndex > -1) {
            analytics.clicks[clickIndex].count += 1;
        } else {
            analytics.clicks.push({ url, count: 1 });
        }
    }

    await analytics.save();
    return NextResponse.json({ success: true });
});

export const GET = withErrorHandling(withAdmin(async () => {
    const stats = await Analytics.find().sort({ date: -1 }).limit(30);

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

    return NextResponse.json({
        success: true,
        stats,
        totals: totals[0] || { totalViews: 0, totalUnique: 0, totalClicks: 0 }
    });
}));
