import { NextRequest, NextResponse } from 'next/server';
import { Message } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const PUT = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { status } = await req.json();
    const message = await Message.findByIdAndUpdate(
        params.id,
        { status, ...(status === 'replied' ? { repliedAt: new Date() } : {}) },
        { new: true }
    );
    if (!message) return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    return NextResponse.json({ success: true, message });
}));

export const DELETE = withErrorHandling(withAdmin(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const message = await Message.findByIdAndDelete(params.id);
    if (!message) return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Message deleted' });
}));
