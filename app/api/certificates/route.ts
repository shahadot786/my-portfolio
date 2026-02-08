import { NextRequest, NextResponse } from 'next/server';
import { Certificate } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async () => {
    const certificates = await Certificate.find().sort({ verified: -1, order: 1 });
    return NextResponse.json({ success: true, certificates });
});

export const POST = withErrorHandling(withAdmin(async (req: NextRequest) => {
    const body = await req.json();
    const certificate = await Certificate.create(body);
    return NextResponse.json({ success: true, certificate });
}));
