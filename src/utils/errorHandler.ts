import { Request, Response, NextFunction } from 'express';
import { CustomError, ApiError } from '../types/errors.js';

export const formatError = (error: CustomError): ApiError => {
  return {
    message: error.message,
    code: error.code,
    status: error.status,
    details: error.details,
    timestamp: new Date().toISOString()
  };
};

export const handleOpenRouterError = (error: any): CustomError => {
  // OpenRouter API errors
  if (error?.response?.data?.error) {
    const openRouterError = error.response.data.error;
    
    switch (openRouterError.type) {
      case 'invalid_request_error':
        return new CustomError(
          openRouterError.message || 'Invalid request to OpenRouter',
          400,
          'OPENROUTER_INVALID_REQUEST',
          { param: openRouterError.param }
        );
      
      case 'rate_limit_error':
        return new CustomError(
          'Rate limit exceeded for OpenRouter API',
          429,
          'OPENROUTER_RATE_LIMIT',
          { retryAfter: error.response.headers['retry-after'] }
        );
      
      case 'authentication_error':
        return new CustomError(
          'OpenRouter authentication failed',
          401,
          'OPENROUTER_AUTH_ERROR'
        );
      
      case 'insufficient_quota':
        return new CustomError(
          'Insufficient quota for OpenRouter API',
          402,
          'OPENROUTER_QUOTA_EXCEEDED'
        );
      
      case 'model_not_found':
        return new CustomError(
          'Model not found or not available',
          404,
          'OPENROUTER_MODEL_NOT_FOUND',
          { model: openRouterError.param }
        );
      
      default:
        return new CustomError(
          openRouterError.message || 'OpenRouter API error',
          400,
          'OPENROUTER_ERROR',
          { type: openRouterError.type }
        );
    }
  }
  
  // Network errors
  if (error.code === 'ECONNREFUSED') {
    return new CustomError(
      'Unable to connect to OpenRouter API',
      503,
      'OPENROUTER_CONNECTION_ERROR'
    );
  }
  
  if (error.code === 'ETIMEDOUT') {
    return new CustomError(
      'OpenRouter API request timed out',
      408,
      'OPENROUTER_TIMEOUT'
    );
  }
  
  // Default error
  return new CustomError(
    error.message || 'Unknown OpenRouter error',
    500,
    'OPENROUTER_UNKNOWN_ERROR'
  );
};

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    timestamp: new Date().toISOString()
  });

  if (error instanceof CustomError) {
    const formattedError = formatError(error);
    return res.status(error.status).json(formattedError);
  }

  // Handle unknown errors
  const unknownError = formatError(new CustomError(
    'Internal server error',
    500,
    'INTERNAL_ERROR'
  ));

  res.status(500).json(unknownError);
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}; 