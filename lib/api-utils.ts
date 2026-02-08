import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';

export function withErrorHandling<T extends unknown[]>(
    handler: (req: NextRequest, ...args: T) => Promise<NextResponse>
) {
    return async (req: NextRequest, ...args: T) => {
        try {
            await connectDB();
            return await handler(req, ...args);
        } catch (error: unknown) {
            console.error('API Error:', error);

            const err = error as { statusCode?: number; message?: string; stack?: string };
            const status = err.statusCode || 500;
            const message = err.message || 'Internal Server Error';

            return NextResponse.json(
                {
                    success: false,
                    error: message,
                    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
                },
                { status }
            );
        }
    };
}
