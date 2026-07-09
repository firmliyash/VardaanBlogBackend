/**
 * Lightweight request logger middleware.
 * Logs the method, URL and response time for every incoming request which is
 * handy when debugging the single GraphQL endpoint.
 */
export const requestLogger = (req, res, next) => {
  const startTimeMs = Date.now();

  res.on('finish', () => {
    const durationMs = Date.now() - startTimeMs;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${durationMs}ms)`,
    );
  });

  next();
};
