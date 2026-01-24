import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables from root .env file
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
export const config = {
    // Server
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    // Database
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio',
    // JWT
    jwtSecret: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-change-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    // Email
    resendApiKey: process.env.RESEND_API_KEY || '',
    // Frontend
    frontendUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    // Flags
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
};
// Validate required environment variables in production
if (config.isProduction) {
    const requiredEnvVars = ['JWT_SECRET', 'JWT_REFRESH_SECRET', 'MONGODB_URI'];
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }
}
//# sourceMappingURL=env.js.map