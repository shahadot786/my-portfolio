import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin, getSession } from '@/lib/auth-utils';
import { User } from '@/lib/models';

export const dynamic = 'force-dynamic';

export const PUT = withErrorHandling(withAdmin(async (req: NextRequest) => {
    const user = await getSession(req);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, email, password } = await req.json();

    const dbUser = await User.findById(user._id).select('+password');
    if (!dbUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (name) dbUser.name = name;
    if (email) dbUser.email = email;
    if (password) dbUser.password = password;

    await dbUser.save();

    return NextResponse.json({ success: true, user: dbUser });
}));
