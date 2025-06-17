export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: any;
  timestamp: string;
}

export interface OpenRouterError {
  error: {
    message: string;
    type: string;
    code?: string;
    param?: string;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

export class CustomError extends Error {
  public status: number;
  public code: string;
  public details?: any;

  constructor(message: string, status: number = 500, code: string = 'INTERNAL_ERROR', details?: any) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    this.name = this.constructor.name;
  }
}

export class OpenRouterError extends CustomError {
  constructor(message: string, details?: any) {
    super(message, 400, 'OPENROUTER_ERROR', details);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string, field?: string) {
    super(message, 400, 'VALIDATION_ERROR', { field });
  }
}

export class RateLimitError extends CustomError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429, 'RATE_LIMIT_ERROR');
  }
}

export class AuthenticationError extends CustomError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

export class AuthorizationError extends CustomError {
  constructor(message: string = 'Access denied') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
} 