import { NextRequest, NextResponse } from 'next/server';
import { Page } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async () => {
    const pages = await Page.find().sort({ slug: 1 });
    return NextResponse.json({ success: true, pages });
});

export const POST = withErrorHandling(withAdmin(async (req: NextRequest) => {
    const body = await req.json();
    const page = await Page.create(body);
    return NextResponse.json({ success: true, page });
}));
