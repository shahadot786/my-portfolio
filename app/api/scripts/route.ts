import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Script } from '@/lib/models';

export async function POST(req: NextRequest) {
  try {
    const { topic, category, audience, duration, tone, prompt } = await req.json();

    if (!topic || !prompt) {
      return NextResponse.json({ error: 'Topic and prompt are required' }, { status: 400 });
    }

    await connectDB();

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        system: `You are an expert Islamic content creator and scriptwriter for the Bengali Facebook Reel page "ইমানের বাগান" (Garden of Faith). You write with deep Islamic knowledge, verified from authentic sources, and craft emotionally resonant, beautifully structured scripts that serve both Muslim and non-Muslim audiences. You always verify Islamic facts before including them and clearly distinguish between authentic narrations and moral parables. Your writing is warm, cinematic, and spiritually nourishing.`,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Anthropic API error');
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || '';

    const newScript = await Script.create({
      topic,
      category,
      audience,
      duration,
      tone,
      content,
    });

    return NextResponse.json({ success: true, data: newScript });
  } catch (error) {
    console.error('Script generation error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const scripts = await Script.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: scripts });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }
}
