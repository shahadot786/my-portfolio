import { NextRequest, NextResponse } from 'next/server';
import { Education } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async () => {
    const education = await Education.find().sort({ order: 1 });
    return NextResponse.json({ success: true, education });
});

export const POST = withErrorHandling(withAdmin(async (req: NextRequest) => {
    const body = await req.json();
    const item = await Education.create(body);
    return NextResponse.json({ success: true, item });
}));
