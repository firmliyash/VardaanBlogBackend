/**
 * Application-level error carrying an HTTP-style status code and a stable
 * error code that the GraphQL layer can surface to the client.
 * Using a dedicated class lets middleware distinguish expected, operational
 * errors (validation, not found) from unexpected programming errors.
 */
export class AppError extends Error {
  constructor(message, statusCode = 400, errorCode = 'BAD_REQUEST') {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/** Convenience factory for a 404 style error. */
export const createNotFoundError = (message = 'Resource not found') =>
  new AppError(message, 404, 'NOT_FOUND');

/** Convenience factory for a validation error. */
export const createValidationError = (message = 'Invalid input') =>
  new AppError(message, 422, 'VALIDATION_ERROR');
