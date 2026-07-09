/**
 * Fallback middleware for any REST route that is not matched.
 * The GraphQL API lives at `/graphql`; anything else returns a clean 404 JSON
 * response instead of the default Express HTML page.
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};
