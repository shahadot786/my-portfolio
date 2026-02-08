import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt';
import { User } from '@/lib/models';

export async function getSession(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value || req.headers.get('authorization')?.split(' ')[1];
    if (!token) return null;

    try {
        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.userId);
        if (!user) return null;
        return user;
    } catch {
        return null;
    }
}

export function withAdmin<T extends unknown[]>(
    handler: (req: NextRequest, ...args: T) => Promise<NextResponse>
) {
    return async (req: NextRequest, ...args: T) => {
        const user = await getSession(req);
        if (!user || user.role !== 'admin') {
            return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
        }
        return handler(req, ...args);
    };
}
