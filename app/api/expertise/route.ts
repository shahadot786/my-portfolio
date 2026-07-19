import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { Expertise } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async () => {
    const items = await Expertise.find().sort({ isFeatured: -1, order: 1 });
    return NextResponse.json({ success: true, items });
});

export const POST = withErrorHandling(withAdmin(async (req: NextRequest) => {
    const body = await req.json();
    const item = await Expertise.create(body);
    revalidatePath('/');
    return NextResponse.json({ success: true, item });
}));
