module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['src/**/*.js'],
      tasks: ['build'],
    },
    concat: {
      dist: {
        src: ['src/init.js',
              'src/router/**/*.js',
              'src/models/**/*.js',
              'src/collections/**/*.js',
              'src/views/*/*.js',
              'src/views/*.js',
              'src/app.js'],
        dest: 'public/js/app.js'
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'public/js/app.js',
        dest: 'public/js/app.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('default', ['watch']);
};
