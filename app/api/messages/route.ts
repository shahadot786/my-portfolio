import { NextRequest, NextResponse } from 'next/server';
import { Message } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(withAdmin(async () => {
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, messages });
}));

export const POST = withErrorHandling(async (req: NextRequest) => {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newMessage = await Message.create({ name, email, subject, message });
    return NextResponse.json({ success: true, message: 'Message sent successfully', data: newMessage });
});
