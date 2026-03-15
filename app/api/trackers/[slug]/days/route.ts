import { NextRequest, NextResponse } from 'next/server';
import { Tracker } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

// Admin: Add or update a day entry (upsert by dayNumber)
export const POST = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const body = await req.json();
    const { dayNumber } = body;

    if (!dayNumber) {
        return NextResponse.json({ error: 'dayNumber is required' }, { status: 400 });
    }

    const tracker = await Tracker.findOne({ slug: params.slug });
    if (!tracker) {
        return NextResponse.json({ error: 'Tracker not found' }, { status: 404 });
    }

    // Find existing day or create new one
    const existingDayIndex = tracker.days.findIndex((d: { dayNumber: number }) => d.dayNumber === dayNumber);

    if (existingDayIndex >= 0) {
        // Update existing day
        Object.assign(tracker.days[existingDayIndex], body);
    } else {
        // Add new day, keep sorted by dayNumber
        tracker.days.push(body);
        tracker.days.sort((a: { dayNumber: number }, b: { dayNumber: number }) => a.dayNumber - b.dayNumber);
    }

    await tracker.save();
    return NextResponse.json({ success: true, tracker });
}));
