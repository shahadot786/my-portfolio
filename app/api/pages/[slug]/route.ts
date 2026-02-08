import { NextRequest, NextResponse } from 'next/server';
import { Page } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const page = await Page.findOne({ slug: params.slug });
    if (!page) return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    return NextResponse.json({ success: true, page });
});

export const PUT = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const body = await req.json();
    const page = await Page.findOneAndUpdate({ slug: params.slug }, body, {
        new: true,
        runValidators: true,
    });
    if (!page) return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    return NextResponse.json({ success: true, page });
}));

export const DELETE = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const page = await Page.findOneAndDelete({ slug: params.slug });
    if (!page) return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Page deleted' });
}));
