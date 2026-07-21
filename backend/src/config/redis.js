const redis = require('redis');
require('dotenv').config();

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  password: process.env.REDIS_PASSWORD || undefined,
});

client.on('error', (err) => console.log('Redis Client Error', err));

// v4+ returns a promise from connect() — fire and catch so a
// connection failure doesn't become an unhandled rejection
client.connect().catch((err) => {
  console.error('Failed to connect to Redis:', err.message);
});

module.exports = client;
