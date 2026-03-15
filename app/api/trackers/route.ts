import { NextRequest, NextResponse } from 'next/server';
import { Tracker } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

// Public: List all trackers (summary only, exclude days array for performance)
export const GET = withErrorHandling(async () => {
    const trackers = await Tracker.find()
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
