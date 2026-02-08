import { NextRequest, NextResponse } from 'next/server';
import { Article } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin, getSession } from '@/lib/auth-utils';

export const GET = withErrorHandling(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const publishedOnly = searchParams.get('published') !== 'false';

    const query: Record<string, unknown> = {};
    if (type) query.type = type;
    if (publishedOnly) query.published = true;

    const articles = await Article.find(query).sort({ publishedAt: -1, createdAt: -1 });
    return NextResponse.json({ success: true, articles });
});

export const POST = withErrorHandling(withAdmin(async (req: NextRequest) => {
    const body = await req.json();
    const user = await getSession(req);
    const article = await Article.create({ ...body, author: user?._id });
    return NextResponse.json({ success: true, article });
}));
