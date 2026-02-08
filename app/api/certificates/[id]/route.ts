import { NextRequest, NextResponse } from 'next/server';
import { Certificate } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const item = await Certificate.findById(params.id);
    if (!item) return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    return NextResponse.json({ success: true, item });
});

export const PUT = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const body = await req.json();
    const item = await Certificate.findByIdAndUpdate(params.id, body, {
        new: true,
        runValidators: true,
    });
    if (!item) return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    return NextResponse.json({ success: true, item });
}));

export const DELETE = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const item = await Certificate.findByIdAndDelete(params.id);
    if (!item) return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Certificate deleted' });
}));
