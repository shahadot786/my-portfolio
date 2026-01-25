import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
export const generateAccessToken = (payload) => {
    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn,
    });
};
export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, config.jwtRefreshSecret, {
        expiresIn: config.jwtRefreshExpiresIn,
    });
};
export const verifyAccessToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, config.jwtRefreshSecret);
};
export const generateTokens = (payload) => {
    return {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload),
    };
};
//# sourceMappingURL=jwt.js.map