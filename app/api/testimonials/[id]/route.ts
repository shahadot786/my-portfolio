import { NextRequest, NextResponse } from 'next/server';
import { Testimonial } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const item = await Testimonial.findById(params.id);
    if (!item) return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    return NextResponse.json({ success: true, item });
});

export const PUT = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const body = await req.json();
    const item = await Testimonial.findByIdAndUpdate(params.id, body, {
        new: true,
        runValidators: true,
    });
    if (!item) return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    return NextResponse.json({ success: true, item });
}));

export const DELETE = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const item = await Testimonial.findByIdAndDelete(params.id);
    if (!item) return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Testimonial deleted' });
}));
