import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { environmentConfig, getAllowedOrigins } from './config/environment.js';
import { connectToDatabase } from './config/database.js';
import { typeDefs, resolvers } from './graphql/schema.js';
import { formatGraphqlError } from './graphql/formatGraphqlError.js';
import { requestLogger } from './middlewares/requestLogger.middleware.js';
import { notFoundHandler } from './middlewares/notFoundHandler.middleware.js';

/**
 * Bootstraps the whole backend:
 *  1. Connects to MongoDB.
 *  2. Starts Apollo Server.
 *  3. Wires Express middleware and mounts the GraphQL endpoint at `/graphql`.
 */
const startServer = async () => {
  await connectToDatabase();

  const expressApp = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: formatGraphqlError,
  });
  await apolloServer.start();

  const corsOptions = {
    origin: getAllowedOrigins(),
    credentials: true,
  };

  // Global middleware.
  expressApp.use(requestLogger);

  // Simple health check for uptime monitors / quick manual verification.
  expressApp.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is healthy' });
  });

  // GraphQL endpoint.
  expressApp.use(
    '/graphql',
    cors(corsOptions),
    express.json(),
    expressMiddleware(apolloServer),
  );

  // 404 handler for every other route (must be last).
  expressApp.use(notFoundHandler);

  expressApp.listen(environmentConfig.port, () => {
    console.log(
      `🚀 GraphQL server ready at http://localhost:${environmentConfig.port}/graphql`,
    );
  });
};

startServer().catch((startupError) => {
  console.error('❌ Failed to start server:', startupError.message);
  process.exit(1);
});
