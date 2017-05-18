module.exports = {
  env: process.env.NODE_ENV || 'development',
  web: {
    port: process.env.PORT || 8080
  },
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost'
  },
  socket: {
    channel: 'sk_pointing_poker',
    host: process.env.SOCKET_HOST || 'localhost',
    port: process.env.SOCKET_PORT || 1625
  },
  env: process.env.NODE_ENV || 'development'
};
