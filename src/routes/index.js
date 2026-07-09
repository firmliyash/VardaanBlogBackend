import { postRoutes } from './post.routes.js';

/**
 * Central registry of every route bundle in the app.
 * Each bundle exposes the same `{ typeDefs, resolvers }` shape. To add a new
 * feature, import its `*.routes.js` bundle and append it to this list — nothing
 * else needs to change.
 */
export const allRoutes = [postRoutes];
