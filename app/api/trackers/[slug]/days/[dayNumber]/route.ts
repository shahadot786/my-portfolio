import { NextRequest, NextResponse } from 'next/server';
import { Tracker } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

// Public: Get a specific day's details
export const GET = withErrorHandling(async (req: NextRequest, { params }: { params: { slug: string; dayNumber: string } }) => {
    const tracker = await Tracker.findOne({ slug: params.slug });
    if (!tracker) {
        return NextResponse.json({ error: 'Tracker not found' }, { status: 404 });
    }

    const dayNum = parseInt(params.dayNumber, 10);
    const day = tracker.days.find((d: { dayNumber: number }) => d.dayNumber === dayNum);
    if (!day) {
        return NextResponse.json({ error: 'Day not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, day });
});

// Admin: Update a specific day
export const PUT = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { slug: string; dayNumber: string } }) => {
    const body = await req.json();
    const dayNum = parseInt(params.dayNumber, 10);

    const tracker = await Tracker.findOne({ slug: params.slug });
    if (!tracker) {
        return NextResponse.json({ error: 'Tracker not found' }, { status: 404 });
    }

    const dayIndex = tracker.days.findIndex((d: { dayNumber: number }) => d.dayNumber === dayNum);
    if (dayIndex < 0) {
        return NextResponse.json({ error: 'Day not found' }, { status: 404 });
    }

    Object.assign(tracker.days[dayIndex], body);
    await tracker.save();

    return NextResponse.json({ success: true, day: tracker.days[dayIndex] });
}));

// Admin: Delete a day entry
export const DELETE = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { slug: string; dayNumber: string } }) => {
    const dayNum = parseInt(params.dayNumber, 10);

    const tracker = await Tracker.findOne({ slug: params.slug });
    if (!tracker) {
        return NextResponse.json({ error: 'Tracker not found' }, { status: 404 });
    }

    const dayIndex = tracker.days.findIndex((d: { dayNumber: number }) => d.dayNumber === dayNum);
    if (dayIndex < 0) {
        return NextResponse.json({ error: 'Day not found' }, { status: 404 });
    }

    tracker.days.splice(dayIndex, 1);
    await tracker.save();

    return NextResponse.json({ success: true, message: 'Day deleted' });
}));
