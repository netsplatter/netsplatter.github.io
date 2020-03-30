module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    less: {
      dev: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'public/css/style.css.map'
        },
        files: {
          'public/css/style.css': 'public/css/style.less'
        }
      }
    },
    watch: {
      server: {
        files: ['app.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['public/css/*.less'],
        tasks: ['less']
      }
    },
    express: {
      options: {
        port: 5000
      },
      dev: {
        options: {
          script: '.'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['express:dev', 'less', 'watch']);
};