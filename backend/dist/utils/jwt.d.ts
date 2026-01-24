import { JwtPayload } from 'jsonwebtoken';
export interface TokenPayload extends JwtPayload {
    userId: string;
    email: string;
    role: string;
}
export declare const generateAccessToken: (payload: Omit<TokenPayload, "iat" | "exp">) => string;
export declare const generateRefreshToken: (payload: Omit<TokenPayload, "iat" | "exp">) => string;
export declare const verifyAccessToken: (token: string) => TokenPayload;
export declare const verifyRefreshToken: (token: string) => TokenPayload;
export declare const generateTokens: (payload: Omit<TokenPayload, "iat" | "exp">) => {
    accessToken: string;
    refreshToken: string;
};
//# sourceMappingURL=jwt.d.ts.map