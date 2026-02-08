import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/models';
import { generateTokens } from '@/lib/jwt';
import { withErrorHandling } from '@/lib/api-utils';

export const POST = withErrorHandling(async (req: NextRequest) => {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const payload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
    };

    const { accessToken, refreshToken } = generateTokens(payload);

    // Save refresh token to user
    await User.findByIdAndUpdate(user._id, {
        $push: { refreshTokens: refreshToken },
    });

    const response = NextResponse.json({
        success: true,
        user,
        accessToken,
    });

    // Set cookies
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
        path: '/',
    };

    response.cookies.set('accessToken', accessToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    response.cookies.set('refreshToken', refreshToken, {
        ...cookieOptions,
        maxAge: 120 * 24 * 60 * 60, // 120 days in seconds
    });

    return response;
});
