import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Profile } from '@/lib/models/Profile';
import { Experience } from '@/lib/models/Experience';
import { Project } from '@/lib/models/Project';
import { SkillCategory } from '@/lib/models/Skill';
import { Expertise } from '@/lib/models/Expertise';
import { Testimonial } from '@/lib/models/Testimonial';
import { Message } from '@/lib/models/Message';

export const runtime = 'nodejs';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const FALLBACK_PROFILE = {
  name: "MD. Shahadot Hossain",
  title: "Enterprise Mobile Architect & Full Stack Engineer",
  bio: [
    "Software Engineer with 4+ years of experience specializing in React Native, TypeScript, and enterprise mobile solutions.",
    "Proven track record of building offline-first applications serving 10,000+ users and 100,000+ daily transactions for Fortune 500 clients like Unilever, BAT, Nestlé, and Nagad."
  ],
  isAvailable: true,
  availabilityBadge: "Available for new opportunities",
  email: "shahadot.swe@gmail.com",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/shahadot786" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/shahadot786" },
    { platform: "Twitter", url: "https://twitter.com/shahadot786" },
    { platform: "YouTube", url: "https://www.youtube.com/@shahadot786" }
  ]
};

async function getPortfolioContext() {
  try {
    await connectDB();
    const [profile, experiences, projects, skills, expertise, testimonials] = await Promise.all([
      Profile.findOne({}).lean().catch(() => null),
      Experience.find({}).sort({ order: 1 }).lean().catch(() => []),
      Project.find({}).sort({ order: 1 }).lean().catch(() => []),
      SkillCategory.find({}).sort({ order: 1 }).lean().catch(() => []),
      Expertise.find({}).sort({ order: 1 }).lean().catch(() => []),
      Testimonial.find({}).lean().catch(() => []),
    ]);

    return {
      profile: profile || FALLBACK_PROFILE,
      experiences: experiences || [],
      projects: projects || [],
      skills: skills || [],
      expertise: expertise || [],
      testimonials: testimonials || []
    };
  } catch {
    return {
      profile: FALLBACK_PROFILE,
      experiences: [],
      projects: [],
      skills: [],
      expertise: [],
      testimonials: []
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, lead } = body as { messages?: ChatMessage[]; lead?: { name: string; email: string; message: string; subject?: string } };

    // Handle lead submission if provided
    if (lead && lead.email && lead.message) {
      try {
        await connectDB();
        const savedMessage = await Message.create({
          name: lead.name || 'AI Assistant Visitor',
          email: lead.email,
          subject: lead.subject || 'AI Assistant Inquiry / Lead',
          message: lead.message,
          status: 'unread'
        });
        return NextResponse.json({
          success: true,
          messageId: savedMessage._id,
          response: "Thank you! I've forwarded your message directly to Shahadot. He will get back to you shortly at " + lead.email + "."
        });
      } catch (err: unknown) {
        console.error("Failed to save lead:", err);
        return NextResponse.json({ success: false, error: "Failed to save inquiry" }, { status: 500 });
      }
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages are required" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY || process.env.XAI_API_KEY;
    const isXai = !process.env.GROQ_API_KEY && !!process.env.XAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        response: "Hello! I am Shahadot's AI Assistant. To activate real-time AI responses, please configure `GROQ_API_KEY` in your `.env` file (free from https://console.groq.com/)."
      });
    }

    const context = await getPortfolioContext();

    const systemPrompt = `You are the personal AI Assistant representing MD. Shahadot Hossain, an Enterprise Mobile Architect & Full Stack Engineer with 4+ years of professional experience.
Your goal is to answer visitor questions accurately, professionally, concisely, and warmly.

ABOUT SHAHADOT:
- Name: ${context.profile.name}
- Title: ${context.profile.title}
- Availability: ${context.profile.isAvailable ? 'Available for new opportunities / contract / full-time' : 'Currently engaged'} (${context.profile.availabilityBadge || ''})
- Bio: ${Array.isArray(context.profile.bio) ? context.profile.bio.join(' ') : ''}

KEY STRENGTHS & HIGHLIGHTS:
- Specializes in React Native (Expo & CLI), TypeScript, offline-first mobile synchronization, high-throughput architectures.
- Built systems serving 10,000+ active enterprise users and 100,000+ daily transactions for Fortune 500 clients: Unilever, BAT (British American Tobacco), Nestlé, and Nagad.
- Full-stack expertise: Next.js, Node.js, Express, MongoDB, PostgreSQL, GraphQL, REST APIs.

WORK HISTORY:
${context.experiences.map((e: { title?: string; company?: string; period?: string; description?: string; achievements?: string[]; technologies?: string[] }) => `- ${e.title} at ${e.company} (${e.period}): ${e.description || ''} Key achievements: ${(e.achievements || []).join(', ')}. Tech: ${(e.technologies || []).join(', ')}`).join('\n')}

FEATURED PROJECTS:
${context.projects.map((p: { title?: string; description?: string; technologies?: string[] }) => `- ${p.title}: ${p.description} (Tech: ${(p.technologies || []).join(', ')})`).join('\n')}

TECHNICAL SKILLS:
${context.skills.map((s: { title?: string; skills?: string[] }) => `- ${s.title}: ${(s.skills || []).join(', ')}`).join('\n')}

RECOMMENDATIONS & TESTIMONIALS:
${context.testimonials.map((t: { name?: string; title?: string; content?: string }) => `- "${t.content}" — ${t.name}, ${t.title}`).join('\n')}

CONTACT CHANNELS:
- Email: ${context.profile.email || 'Available on request'}
- GitHub: https://github.com/shahadot786
- LinkedIn: https://www.linkedin.com/in/shahadot786

RESPONSE GUIDELINES:
1. Always speak favorably, professionally, and authentically about Shahadot.
2. Keep answers concise, direct, and well-formatted with markdown (bullet points, bold text).
3. If the user asks about hiring, collaborating, scheduling a call, or sharing their project scope, encourage them to leave their name and email, and offer: "Would you like me to connect you with Shahadot? Just share your email and a quick note about your project!"
4. If asked something unrelated to technology, software, or Shahadot, politely guide the conversation back to Shahadot's work and qualifications.`;

    const apiUrl = isXai
      ? 'https://api.x.ai/v1/chat/completions'
      : 'https://api.groq.com/openai/v1/chat/completions';

    const model = isXai
      ? (process.env.XAI_MODEL || 'grok-beta')
      : (process.env.GROQ_MODEL || 'openai/gpt-oss-120b');

    // Build message payload (keep recent context)
    const recentMessages = messages.slice(-8).map(m => ({
      role: m.role,
      content: m.content
    }));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...recentMessages
        ],
        temperature: 0.7,
        max_tokens: 500,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq/xAI API Error:", errorText);
      return NextResponse.json({
        response: "I'm having a brief connection issue with the inference engine. Please try again or reach out directly at " + (context.profile.email || "the Contact page") + "!"
      });
    }

    const data = await response.json();
    let assistantReply = data.choices?.[0]?.message?.content || "I'm ready to answer any questions about Shahadot's experience!";
    // Clean any <think> tags if model produces reasoning output
    assistantReply = assistantReply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

    return NextResponse.json({
      response: assistantReply,
      model
    });
  } catch (error: unknown) {
    console.error("Assistant Route Error:", error);
    return NextResponse.json(
      { response: "Something went wrong while processing your request. Please try again shortly." },
      { status: 500 }
    );
  }
}
