import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * Blog post schema.
 * `timestamps: true` automatically maintains `createdAt` and `updatedAt`.
 */
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      minlength: [10, 'Content must be at least 10 characters long'],
    },
    author: {
      type: String,
      trim: true,
      default: 'Anonymous',
      maxlength: [80, 'Author name cannot exceed 80 characters'],
    },
  },
  { timestamps: true },
);

export const PostModel = model('Post', postSchema);
