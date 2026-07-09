import { createValidationError } from '../helpers/appError.js';

/**
 * Post input-validation middleware / guard.
 *
 * In a GraphQL API there is no per-field Express route, so "middleware" for a
 * resolver is implemented as a guard function the controller runs before it
 * delegates to the service. `validateCreatePostInput` both validates and
 * normalises the incoming payload, throwing a validation `AppError` (which the
 * GraphQL error formatter turns into a clean client message) when it is bad.
 *
 * @param {{ title?: string, content?: string, author?: string }} rawInput
 * @returns {{ title: string, content: string, author: string }}
 */
export const validateCreatePostInput = (rawInput = {}) => {
  const validationMessages = [];

  const title = typeof rawInput.title === 'string' ? rawInput.title.trim() : '';
  const content = typeof rawInput.content === 'string' ? rawInput.content.trim() : '';
  const author =
    typeof rawInput.author === 'string' && rawInput.author.trim().length > 0
      ? rawInput.author.trim()
      : 'Anonymous';

  if (title.length < 3) {
    validationMessages.push('Title must be at least 3 characters long.');
  }
  if (title.length > 150) {
    validationMessages.push('Title cannot exceed 150 characters.');
  }
  if (content.length < 10) {
    validationMessages.push('Content must be at least 10 characters long.');
  }

  if (validationMessages.length > 0) {
    throw createValidationError(validationMessages.join(' '));
  }

  return { title, content, author };
};
