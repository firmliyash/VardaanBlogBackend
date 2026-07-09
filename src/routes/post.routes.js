import { postResolvers } from '../controllers/post.controller.js';

/**
 * GraphQL schema (SDL) for the post feature.
 * In a GraphQL API the schema is the set of "routes" (operations) the client
 * can call, so the type definitions live in this `*.routes.js` file.
 */
const postTypeDefs = `#graphql
  """A single blog post."""
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    createdAt: String!
    updatedAt: String!
  }

  """Input payload used when creating a new post."""
  input CreatePostInput {
    title: String!
    content: String!
    author: String
  }

  type Query {
    """Fetch all blog posts, newest first."""
    posts: [Post!]!

    """Fetch a single blog post by its id."""
    post(id: ID!): Post
  }

  type Mutation {
    """Create a new blog post and return the saved document."""
    createPost(input: CreatePostInput!): Post!
  }
`;

/**
 * The post route bundle: ties the schema (`typeDefs`) together with its
 * handlers (`resolvers` from the controller, which use the service and model).
 * The GraphQL layer registers this bundle, so every feature exposes the same
 * `{ typeDefs, resolvers }` shape.
 */
export const postRoutes = {
  typeDefs: postTypeDefs,
  resolvers: postResolvers,
};
