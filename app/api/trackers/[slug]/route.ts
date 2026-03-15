import { NextRequest, NextResponse } from 'next/server';
import { Tracker } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

// Public: Get full tracker by slug
export const GET = withErrorHandling(async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const tracker = await Tracker.findOne({ slug: params.slug });
    if (!tracker) {
        return NextResponse.json({ error: 'Tracker not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, tracker });
});

// Admin: Update tracker metadata
export const PUT = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const body = await req.json();
    const tracker = await Tracker.findOneAndUpdate({ slug: params.slug }, body, {
        new: true,
        runValidators: true,
    });
    if (!tracker) {
        return NextResponse.json({ error: 'Tracker not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, tracker });
}));

// Admin: Delete tracker
export const DELETE = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const tracker = await Tracker.findOneAndDelete({ slug: params.slug });
    if (!tracker) {
        return NextResponse.json({ error: 'Tracker not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Tracker deleted' });
}));
