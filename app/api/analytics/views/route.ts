import { NextResponse } from 'next/server';
import { Analytics } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';

export const dynamic = 'force-dynamic';

export const GET = withErrorHandling(async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totals, todayData] = await Promise.all([
        Analytics.aggregate([
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: '$pageViews' },
                    totalUnique: { $sum: '$uniqueVisitors' },
                }
            }
        ]),
        Analytics.findOne({ date: today }).select('pageViews uniqueVisitors')
    ]);

    const totalViews = totals[0]?.totalViews || 0;
    const totalUnique = totals[0]?.totalUnique || 0;
    const todayViews = todayData?.pageViews || 0;

    return NextResponse.json({
        success: true,
        totalViews,
        totalUnique,
        todayViews
    });
});
