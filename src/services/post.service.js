import { PostModel } from '../models/post.model.js';

/**
 * Service layer: all data-access and business logic for posts.
 * Keeping this separate from the controller (resolvers) keeps the controller
 * thin and makes the logic easy to reuse and unit test.
 */

/**
 * Returns every blog post, newest first.
 */
export const fetchAllPosts = async () => {
  const postList = await PostModel.find().sort({ createdAt: -1 }).lean();
  return postList;
};

/**
 * Returns a single blog post by id, or null when it does not exist.
 */
export const fetchPostById = async (postId) => {
  const foundPost = await PostModel.findById(postId).lean();
  return foundPost;
};

/**
 * Persists a new blog post. Expects already-validated input.
 */
export const createPost = async (validatedInput) => {
  const createdPost = await PostModel.create(validatedInput);
  return createdPost;
};
