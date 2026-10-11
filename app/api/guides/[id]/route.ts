import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isValidObjectId } from 'mongoose';
import { Guide } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin, getSession } from '@/lib/auth-utils';
import { guideInputSchema } from '@/lib/guides/schema';
import { estimateReadingTime } from '@/lib/guides/toc';
import { serializeGuide } from '@/lib/guides/serialize';

export const dynamic = 'force-dynamic';

type Params = { params: { id: string } };

// `id` is the Mongo id for admin calls and the slug for public reads
const lookup = (id: string) => (isValidObjectId(id) ? { _id: id } : { slug: id.toLowerCase() });

const revalidateGuides = (...slugs: string[]) => {
    revalidatePath('/articles');
    revalidatePath('/guides/[slug]', 'page');
    revalidatePath('/sitemap.xml');
    slugs.forEach((slug) => revalidatePath(`/guides/${slug}`));
};

export const GET = withErrorHandling(async (req: NextRequest, { params }: Params) => {
    const guide = await Guide.findOne(lookup(params.id)).lean();
    if (!guide) return NextResponse.json({ success: false, error: 'Guide not found' }, { status: 404 });

    if (!guide.published) {
        const user = await getSession(req);
        if (user?.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Guide not found' }, { status: 404 });
        }
    }

    return NextResponse.json({ success: true, guide: serializeGuide(guide) });
});

export const PUT = withErrorHandling(withAdmin(async (req: NextRequest, { params }: Params) => {
    const parsed = guideInputSchema.safeParse(await req.json());
    if (!parsed.success) {
        return NextResponse.json({ success: false, error: parsed.error.issues[0]?.message ?? 'Invalid guide' }, { status: 400 });
    }

    const input = parsed.data;
    const guide = await Guide.findOne(lookup(params.id));
    if (!guide) return NextResponse.json({ success: false, error: 'Guide not found' }, { status: 404 });

    if (input.slug !== guide.slug && (await Guide.exists({ slug: input.slug }))) {
        return NextResponse.json({ success: false, error: 'A guide with this slug already exists' }, { status: 409 });
    }

    const previousSlug = guide.slug;
    guide.set({
        ...input,
        readingTime: estimateReadingTime(input.content),
        publishedAt: input.published ? guide.publishedAt ?? new Date() : guide.publishedAt,
    });
    await guide.save();

    revalidateGuides(previousSlug, guide.slug);
    return NextResponse.json({ success: true, guide: serializeGuide(guide) });
}));

export const DELETE = withErrorHandling(withAdmin(async (_req: NextRequest, { params }: Params) => {
    const guide = await Guide.findOneAndDelete(lookup(params.id));
    if (!guide) return NextResponse.json({ success: false, error: 'Guide not found' }, { status: 404 });

    revalidateGuides(guide.slug);
    return NextResponse.json({ success: true });
}));
