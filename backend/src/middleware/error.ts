import { Request, Response, NextFunction } from 'express';
import { config } from '../config/index.js';

export interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export class ApiError extends Error implements AppError {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  const error = new ApiError(`Not found - ${req.originalUrl}`, 404);
  next(error);
};

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error in development
  if (config.isDevelopment) {
    console.error('Error:', {
      message: err.message,
      stack: err.stack,
      statusCode,
    });
  }

  // Mongoose duplicate key error
  if ((err as unknown as Record<string, unknown>).code === 11000) {
    const field = Object.keys((err as unknown as Record<string, unknown>).keyValue as Record<string, unknown> || {})[0];
    res.status(400).json({
      error: `${field ? `${field} already exists` : 'Duplicate field value'}`,
    });
    return;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const mongooseErrors = (err as unknown as Record<string, unknown>).errors as Record<string, { message: string }>;
    const errors = Object.values(mongooseErrors || {}).map(
      (e) => e.message
    );
    res.status(400).json({
      error: 'Validation failed',
      details: errors,
    });
    return;
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    res.status(400).json({
      error: 'Invalid ID format',
    });
    return;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      error: 'Invalid token',
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      error: 'Token expired',
    });
    return;
  }

  res.status(statusCode).json({
    error: message,
    ...(config.isDevelopment && { stack: err.stack }),
  });
};
