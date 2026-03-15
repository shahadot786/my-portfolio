import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { TopicProgress } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const progress = await TopicProgress.find();
    return NextResponse.json({ success: true, data: progress });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { topicId, isFinished } = await req.json();

    if (typeof topicId === 'undefined') {
      return NextResponse.json({ error: 'topicId is required' }, { status: 400 });
    }

    await connectDB();

    const updatedProgress = await TopicProgress.findOneAndUpdate(
      { topicId },
      { isFinished, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, data: updatedProgress });
  } catch (error) {
    console.error('Topic progress error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }
}
