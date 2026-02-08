import { NextRequest, NextResponse } from 'next/server';
import { Testimonial } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';
import { withAdmin } from '@/lib/auth-utils';

export const GET = withErrorHandling(async () => {
    const testimonials = await Testimonial.find().sort({ featured: -1, order: 1 });
    return NextResponse.json({ success: true, testimonials });
});

export const POST = withErrorHandling(withAdmin(async (req: NextRequest) => {
    const body = await req.json();
    const testimonial = await Testimonial.create(body);
    return NextResponse.json({ success: true, testimonial });
}));
