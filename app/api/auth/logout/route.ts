import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling } from '@/lib/api-utils';
import { verifyAccessToken } from '@/lib/jwt';
import { User } from '@/lib/models';

export const dynamic = 'force-dynamic';

export const POST = withErrorHandling(async (req: NextRequest) => {
    const token = req.cookies.get('accessToken')?.value || req.headers.get('authorization')?.split(' ')[1];
    const refreshToken = req.cookies.get('refreshToken')?.value || (await req.json()).refreshToken;

    if (token) {
        try {
            const decoded = verifyAccessToken(token);
            if (refreshToken) {
                await User.findByIdAndUpdate(decoded.userId, {
                    $pull: { refreshTokens: refreshToken },
                });
            }
        } catch {
            // Token might be expired, which is fine for logout
        }
    }

    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

    response.cookies.set('accessToken', '', { maxAge: 0, path: '/' });
    response.cookies.set('refreshToken', '', { maxAge: 0, path: '/' });

    return response;
});
