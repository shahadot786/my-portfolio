import { NextRequest, NextResponse } from 'next/server';
import { Profile } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async () => {
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    if (!profile) {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, profile });
});

export const PUT = withErrorHandling(withAdmin(async (req: NextRequest) => {
    const body = await req.json();
    let profile = await Profile.findOne().sort({ createdAt: -1 });

    if (profile) {
        profile = await Profile.findByIdAndUpdate(profile._id, body, {
            new: true,
            runValidators: true,
        });
    } else {
        profile = await Profile.create(body);
    }

    return NextResponse.json({ success: true, profile });
}));
