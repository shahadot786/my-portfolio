import { NextResponse } from 'next/server';
import { Analytics, Article } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const dynamic = 'force-dynamic';

export const GET = withErrorHandling(withAdmin(async () => {
    // 1. Get Totals
    const totals = await Analytics.aggregate([
        {
            $group: {
                _id: null,
                totalViews: { $sum: '$pageViews' },
                totalUnique: { $sum: '$uniqueVisitors' },
            }
        }
    ]);

    // 2. Get Article Count
    const articleCount = await Article.countDocuments();

    // 3. Aggregate Metrics across all days
    const aggregateMetric = async (field: string) => {
        const result = await Analytics.aggregate([
            { $unwind: `$${field}` },
            {
                $group: {
                    _id: `$${field}.name`,
                    count: { $sum: `$${field}.count` }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 5 },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: 1
                }
            }
        ]);
        return result;
    };

    // 4. Aggregate Clicks (different structure: url/count)
    const aggregateClicks = await Analytics.aggregate([
        { $unwind: '$clicks' },
        {
            $group: {
                _id: '$clicks.url',
                count: { $sum: '$clicks.count' }
            }
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
        {
            $project: {
                _id: 0,
                url: '$_id',
                count: 1
            }
        }
    ]);

    // 5. Aggregate Locations (country/city)
    const aggregateLocations = await Analytics.aggregate([
        { $unwind: '$locations' },
        {
            $group: {
                _id: '$locations.country',
                count: { $sum: '$locations.count' }
            }
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
        {
            $project: {
                _id: 0,
                name: '$_id',
                count: 1
            }
        }
    ]);

    const [topBrowsers, topOS, topReferrers, topLanguages, topScreens] = await Promise.all([
        aggregateMetric('browsers'),
        aggregateMetric('os'),
        aggregateMetric('referrers'),
        aggregateMetric('languages'),
        aggregateMetric('screens'),
    ]);

    // Sum up total clicks from the aggregated click result
    const totalClicks = aggregateClicks.reduce((sum, c) => sum + c.count, 0);

    return NextResponse.json({
        success: true,
        totals: {
            totalViews: totals[0]?.totalViews || 0,
            totalUnique: totals[0]?.totalUnique || 0,
            totalClicks: totalClicks
        },
        articleCount,
        topClicks: aggregateClicks,
        topBrowsers,
        topOS,
        topLocations: aggregateLocations,
        topReferrers,
        topLanguages,
        topScreens
    });
}));
