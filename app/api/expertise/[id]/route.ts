import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { Expertise } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const item = await Expertise.findById(params.id);
    if (!item) return NextResponse.json({ error: 'Expertise item not found' }, { status: 404 });
    return NextResponse.json({ success: true, item });
});

export const PUT = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const body = await req.json();
    const item = await Expertise.findByIdAndUpdate(params.id, body, {
        new: true,
        runValidators: true,
    });
    if (!item) return NextResponse.json({ error: 'Expertise item not found' }, { status: 404 });
    revalidatePath('/');
    return NextResponse.json({ success: true, item });
}));

export const DELETE = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const item = await Expertise.findByIdAndDelete(params.id);
    if (!item) return NextResponse.json({ error: 'Expertise item not found' }, { status: 404 });
    revalidatePath('/');
    return NextResponse.json({ success: true, message: 'Expertise item deleted' });
}));
