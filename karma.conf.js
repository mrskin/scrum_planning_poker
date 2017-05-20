module.exports = function(config) {
  config.set({
    autoWatch: true,
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    frameworks: ['jasmine'],
    browsers: ['ChromeHeadless'],
    files: [
      'node_modules/sinon/pkg/sinon-no-sourcemaps.js',
      'public/js/vendor/socket.io.js',
      'public/js/vendor/jquery.min.js',
      'public/js/vendor/jquery.cookie.js',
      'public/js/vendor/underscore-min.js',
      'public/js/vendor/backbone-min.js',
      'public/js/vendor/backbone.stickit.js',
      'spec/mock_socket.js',
      'src/init.js',
      'src/router/**/*.js',
      'src/models/**/*.js',
      'src/collections/**/*.js',
      'src/views/*/*.js',
      'src/views/*.js',
      'src/app.js',
      'spec/src/**/*.js'
    ]
  })
};
