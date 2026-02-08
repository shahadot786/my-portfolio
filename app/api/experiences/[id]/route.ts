import { NextRequest, NextResponse } from 'next/server';
import { Experience } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const experience = await Experience.findById(params.id);
    if (!experience) {
        return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, experience });
});

export const PUT = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const body = await req.json();
    const experience = await Experience.findByIdAndUpdate(params.id, body, {
        new: true,
        runValidators: true,
    });
    if (!experience) {
        return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, experience });
}));

export const DELETE = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const experience = await Experience.findByIdAndDelete(params.id);
    if (!experience) {
        return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Experience deleted' });
}));
