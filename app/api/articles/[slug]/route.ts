import { NextRequest, NextResponse } from 'next/server';
import { Article } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const article = await Article.findOne({ slug: params.slug }).populate('author', 'name avatar');
    if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });

    // Increment views
    article.views += 1;
    await article.save();

    return NextResponse.json({ success: true, article });
});

export const PUT = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const body = await req.json();
    const article = await Article.findOneAndUpdate({ slug: params.slug }, body, {
        new: true,
        runValidators: true,
    });
    if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    return NextResponse.json({ success: true, article });
}));

export const DELETE = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const article = await Article.findOneAndDelete({ slug: params.slug });
    if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Article deleted' });
}));
