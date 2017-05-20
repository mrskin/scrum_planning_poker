module.exports = {
  env: process.env.NODE_ENV || 'development',
  web: {
    port: process.env.PORT || 8080
  },
  socket: {
    host: process.env.SOCKET_HOST || 'localhost',
    port: process.env.SOCKET_PORT || 8080
  },
  env: process.env.NODE_ENV || 'development'
};
