import { NextRequest, NextResponse } from 'next/server';
import { Education } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const item = await Education.findById(params.id);
    if (!item) return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    return NextResponse.json({ success: true, item });
});

export const PUT = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const body = await req.json();
    const item = await Education.findByIdAndUpdate(params.id, body, {
        new: true,
        runValidators: true,
    });
    if (!item) return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    return NextResponse.json({ success: true, item });
}));

export const DELETE = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const item = await Education.findByIdAndDelete(params.id);
    if (!item) return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Education deleted' });
}));
