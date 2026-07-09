import mongoose from 'mongoose';
import { environmentConfig } from './environment.js';

/**
 * Establishes a single, reusable connection to MongoDB using Mongoose.
 * The function throws on failure so the caller (server bootstrap) can decide
 * whether to exit the process.
 */
export const connectToDatabase = async () => {
  try {
    const connectionInstance = await mongoose.connect(environmentConfig.mongoUri);
    console.log(
      `✅ MongoDB connected: ${connectionInstance.connection.host}/${connectionInstance.connection.name}`,
    );
    return connectionInstance;
  } catch (connectionError) {
    console.error('❌ Failed to connect to MongoDB:', connectionError.message);
    throw connectionError;
  }
};
