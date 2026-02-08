import { NextRequest, NextResponse } from 'next/server';
import { Experience } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async () => {
    const experiences = await Experience.find().sort({ order: 1 });
    return NextResponse.json({ success: true, experiences });
});

export const POST = withErrorHandling(withAdmin(async (req: NextRequest) => {
    const body = await req.json();
    const experience = await Experience.create(body);
    return NextResponse.json({ success: true, experience });
}));
