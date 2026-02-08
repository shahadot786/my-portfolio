// Environment configuration for Next.js API routes
export const config = {
    // Database
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio',

    // JWT
    jwtSecret: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-change-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '120d',

    // Email
    resendApiKey: process.env.RESEND_API_KEY || '',

    // Frontend
    frontendUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

    // Flags
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
} as const;
