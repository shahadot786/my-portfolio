import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { Guide } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin, getSession } from '@/lib/auth-utils';
import { guideInputSchema } from '@/lib/guides/schema';
import { estimateReadingTime } from '@/lib/guides/toc';
import { serializeGuide, serializeGuideSummary } from '@/lib/guides/serialize';

export const dynamic = 'force-dynamic';

// Public: published guides only. Admin session: everything, drafts included. No markdown body in lists.
export const GET = withErrorHandling(async (req: NextRequest) => {
    const user = await getSession(req);
    const isAdmin = user?.role === 'admin';

    const guides = await Guide.find(isAdmin ? {} : { published: true })
        .select('-content')
        .sort(isAdmin ? { updatedAt: -1 } : { publishedAt: -1 })
        .lean();

    return NextResponse.json({ success: true, guides: guides.map(serializeGuideSummary) });
});

export const POST = withErrorHandling(withAdmin(async (req: NextRequest) => {
    const parsed = guideInputSchema.safeParse(await req.json());
    if (!parsed.success) {
        return NextResponse.json({ success: false, error: parsed.error.issues[0]?.message ?? 'Invalid guide' }, { status: 400 });
    }

    const input = parsed.data;
    if (await Guide.exists({ slug: input.slug })) {
        return NextResponse.json({ success: false, error: 'A guide with this slug already exists' }, { status: 409 });
    }

    const guide = await Guide.create({
        ...input,
        readingTime: estimateReadingTime(input.content),
        publishedAt: input.published ? new Date() : undefined,
    });

    revalidatePath('/articles');
    revalidatePath('/guides/[slug]', 'page');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true, guide: serializeGuide(guide) }, { status: 201 });
}));
