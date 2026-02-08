import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling } from '@/lib/api-utils';
import { verifyRefreshToken, generateTokens } from '@/lib/jwt';
import { User } from '@/lib/models';

export const dynamic = 'force-dynamic';

export const POST = withErrorHandling(async (req: NextRequest) => {
    const oldRefreshToken = req.cookies.get('refreshToken')?.value || (await req.json()).refreshToken;

    if (!oldRefreshToken) {
        return NextResponse.json({ error: 'Refresh token required' }, { status: 401 });
    }

    try {
        const decoded = verifyRefreshToken(oldRefreshToken);
        const user = await User.findById(decoded.userId).select('+refreshTokens');

        if (!user || !user.refreshTokens.includes(oldRefreshToken)) {
            return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
        }

        const payload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        };

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(payload);

        // Rotate refresh token
        user.refreshTokens = user.refreshTokens.filter((token: string) => token !== oldRefreshToken);
        user.refreshTokens.push(newRefreshToken);
        await user.save();

        const response = NextResponse.json({
            success: true,
            accessToken,
        });

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
            path: '/',
        };

        response.cookies.set('accessToken', accessToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60,
        });

        response.cookies.set('refreshToken', newRefreshToken, {
            ...cookieOptions,
            maxAge: 120 * 24 * 60 * 60,
        });

        return response;
    } catch {
        return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
    }
});
