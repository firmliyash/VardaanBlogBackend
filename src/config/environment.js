import dotenv from 'dotenv';

dotenv.config();

/**
 * Centralised, typed access to environment variables.
 * Keeping this in one place avoids reading `process.env` all over the codebase
 * and makes it easy to spot a missing configuration value.
 */
export const environmentConfig = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blogApp',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
};

/**
 * Splits the configured client origin(s) into an array so multiple frontend
 * URLs can be whitelisted for CORS (e.g. local + deployed).
 */
export const getAllowedOrigins = () =>
  environmentConfig.clientOrigin.split(',').map((origin) => origin.trim());
