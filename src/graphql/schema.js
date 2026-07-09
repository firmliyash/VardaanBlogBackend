import { mergeResolvers } from '../helpers/mergeResolvers.js';
import { allRoutes } from '../routes/index.js';

/**
 * Builds the executable schema from every registered route bundle.
 * `typeDefs` becomes an array of SDL strings (Apollo accepts this), and every
 * bundle's resolver map is merged into one via the `mergeResolvers` helper.
 */
export const typeDefs = allRoutes.map((routeBundle) => routeBundle.typeDefs);

export const resolvers = mergeResolvers(
  allRoutes.map((routeBundle) => routeBundle.resolvers),
);
