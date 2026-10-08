import { NextRequest, NextResponse } from 'next/server';
import { Tracker } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin, getSession } from '@/lib/auth-utils';

export const dynamic = 'force-dynamic';

// Public: List published trackers (admin sees all; summary only, exclude days array for performance)
export const GET = withErrorHandling(async (req: NextRequest) => {
    const user = await getSession(req);
    const isAdmin = user?.role === 'admin';
    // Hidden trackers are only listed for the admin
    const trackers = await Tracker.find(isAdmin ? {} : { published: { $ne: false } })
        .select('-days')
        .sort({ featured: -1, createdAt: -1 });
    return NextResponse.json({ success: true, trackers });
});

// Admin: Create a new tracker
export const POST = withErrorHandling(withAdmin(async (req: NextRequest) => {
    const body = await req.json();
    const tracker = await Tracker.create(body);
    return NextResponse.json({ success: true, tracker });
}));
