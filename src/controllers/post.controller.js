import {
  fetchAllPosts,
  fetchPostById,
  createPost,
} from '../services/post.service.js';
import { validateCreatePostInput } from '../middlewares/post.middleware.js';
import { createNotFoundError } from '../helpers/appError.js';

/**
 * Maps a Mongoose document to the shape expected by the GraphQL schema.
 * Converts `_id`/date fields to the string types the schema declares.
 */
const mapPostToGraphql = (postDocument) => ({
  id: postDocument._id.toString(),
  title: postDocument.title,
  content: postDocument.content,
  author: postDocument.author,
  createdAt: new Date(postDocument.createdAt).toISOString(),
  updatedAt: new Date(postDocument.updatedAt).toISOString(),
});

/**
 * Controller for the post feature — the GraphQL resolver map.
 * Resolvers stay thin: run any validation middleware, delegate the real work
 * to the service, then adapt the result to the GraphQL response shape.
 */
export const postResolvers = {
  Query: {
    posts: async () => {
      const postList = await fetchAllPosts();
      return postList.map(mapPostToGraphql);
    },

    post: async (_parent, { id }) => {
      const foundPost = await fetchPostById(id);
      if (!foundPost) {
        throw createNotFoundError(`No post found with id: ${id}`);
      }
      return mapPostToGraphql(foundPost);
    },
  },

  Mutation: {
    createPost: async (_parent, { input }) => {
      const validatedInput = validateCreatePostInput(input);
      const savedPost = await createPost(validatedInput);
      return mapPostToGraphql(savedPost);
    },
  },
};
