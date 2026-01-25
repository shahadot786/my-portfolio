import { verifyAccessToken } from '../utils/jwt.js';
import { User } from '../models/index.js';
export const authenticate = async (req, res, next) => {
    try {
        // Get token from header or cookie
        let token;
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
        else if (req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        }
        if (!token) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }
        // Verify token
        const decoded = verifyAccessToken(token);
        // Check if user still exists
        const user = await User.findById(decoded.userId);
        if (!user) {
            res.status(401).json({ error: 'User no longer exists' });
            return;
        }
        // Attach user to request
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
        };
        next();
    }
    catch {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};
export const requireAdmin = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ error: 'Authentication required' });
        return;
    }
    if (req.user.role !== 'admin') {
        res.status(403).json({ error: 'Admin access required' });
        return;
    }
    next();
};
export const optionalAuth = async (req, _res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
        else if (req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        }
        if (token) {
            const decoded = verifyAccessToken(token);
            req.user = {
                userId: decoded.userId,
                email: decoded.email,
                role: decoded.role,
            };
        }
        next();
    }
    catch {
        // Token invalid, but that's okay for optional auth
        next();
    }
};
//# sourceMappingURL=auth.js.map