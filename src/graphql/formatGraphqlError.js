/**
 * Apollo `formatError` hook.
 * Normalises errors thrown inside resolvers so the client always receives a
 * clean message and a stable machine-readable code, while hiding stack traces
 * and internal details in production.
 */
export const formatGraphqlError = (formattedError, originalError) => {
  const rootError = originalError?.originalError ?? originalError;

  // Operational errors (validation, not found) carry their own code.
  if (rootError?.isOperational) {
    return {
      message: rootError.message,
      extensions: {
        code: rootError.errorCode,
        statusCode: rootError.statusCode,
      },
    };
  }

  // Mongoose schema validation errors.
  if (rootError?.name === 'ValidationError') {
    const combinedMessage = Object.values(rootError.errors)
      .map((fieldError) => fieldError.message)
      .join(' ');
    return {
      message: combinedMessage,
      extensions: { code: 'VALIDATION_ERROR', statusCode: 422 },
    };
  }

  // Invalid Mongo ObjectId.
  if (rootError?.name === 'CastError') {
    return {
      message: `Invalid id format: ${rootError.value}`,
      extensions: { code: 'BAD_REQUEST', statusCode: 400 },
    };
  }

  // Anything else is unexpected — log it and return a generic message.
  console.error('Unexpected GraphQL error:', originalError);
  return {
    message: 'Something went wrong. Please try again later.',
    extensions: { code: 'INTERNAL_SERVER_ERROR', statusCode: 500 },
  };
};
