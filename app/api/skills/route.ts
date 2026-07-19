import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { SkillCategory } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const dynamic = 'force-dynamic';

export const GET = withErrorHandling(async () => {
    const skills = await SkillCategory.find().sort({ order: 1 });
    return NextResponse.json({ success: true, skills });
});

export const POST = withErrorHandling(withAdmin(async (req: NextRequest) => {
    const body = await req.json();
    const skill = await SkillCategory.create(body);
    revalidatePath('/skills');
    revalidatePath('/');
    return NextResponse.json({ success: true, skill });
}));
