import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

export const config = {
  server: {
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || '0.0.0.0',
    env: process.env.NODE_ENV || 'development'
  },
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '3600')
  },
  rateLimit: {
    window: parseInt(process.env.RATE_LIMIT_WINDOW || '60000'),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '60')
  }
};
