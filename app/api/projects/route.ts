import { NextRequest, NextResponse } from 'next/server';
import { Project } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async () => {
    const projects = await Project.find().sort({ featured: -1, order: 1 });
    return NextResponse.json({ success: true, projects });
});

export const POST = withErrorHandling(withAdmin(async (req: NextRequest) => {
    const body = await req.json();
    const project = await Project.create(body);
    return NextResponse.json({ success: true, project });
}));
