import { Request, Response, NextFunction } from 'express';
export interface AppError extends Error {
    statusCode?: number;
    status?: string;
    isOperational?: boolean;
}
export declare class ApiError extends Error implements AppError {
    statusCode: number;
    status: string;
    isOperational: boolean;
    constructor(message: string, statusCode: number);
}
export declare const notFound: (req: Request, _res: Response, next: NextFunction) => void;
export declare const errorHandler: (err: AppError, _req: Request, res: Response, _next: NextFunction) => void;
//# sourceMappingURL=error.d.ts.map