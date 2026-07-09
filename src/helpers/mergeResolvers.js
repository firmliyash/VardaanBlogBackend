/**
 * Merges an array of per-module resolver maps into a single resolver object.
 * Keeps `Query` and `Mutation` fields from every feature module in one place
 * so new modules can be added without touching the server bootstrap.
 *
 * @param {Array<{ Query?: object, Mutation?: object }>} resolverModules
 * @returns {{ Query: object, Mutation: object }}
 */
export const mergeResolvers = (resolverModules) => {
  const mergedResolvers = { Query: {}, Mutation: {} };

  resolverModules.forEach((resolverModule) => {
    Object.assign(mergedResolvers.Query, resolverModule.Query);
    Object.assign(mergedResolvers.Mutation, resolverModule.Mutation);
  });

  return mergedResolvers;
};
