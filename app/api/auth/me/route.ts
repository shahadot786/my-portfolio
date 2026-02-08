import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling } from '@/lib/api-utils';
import { verifyAccessToken } from '@/lib/jwt';
import { User } from '@/lib/models';

export const dynamic = 'force-dynamic';

export const GET = withErrorHandling(async (req: NextRequest) => {
    const token = req.cookies.get('accessToken')?.value || req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    try {
        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return NextResponse.json({ error: 'User no longer exists' }, { status: 401 });
        }

        return NextResponse.json({ success: true, user });
    } catch {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
});
