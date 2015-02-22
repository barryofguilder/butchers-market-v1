module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Specifies all the paths that will be used in this file
    paths: {
      // Destination location for the builds
      dest: 'build'
    },

    assemble: {
      options: {
        assets: '<%= paths.dest %>',
        data: 'data/**/*.yaml',
        layout: 'templates/layouts/default.hbs',
        partials: ['templates/partials/**/*.hbs']
      },
      site: {
        options: {
          flatten: true
        },
        src: ['templates/pages/**/*.hbs'],
        dest: '<%= paths.dest %>'
      }
    },

    'cache-busting': {
      options: {
        cleanup: true
      },
      css: {
        replace: ['<%= paths.dest %>/**/*.html'],
        replacement: 'bm-styles.css',
        file: '<%= paths.dest %>/css/bm-styles.css'
      },
      scriptsApp: {
        replace: ['<%= paths.dest %>/**/*.html'],
        replacement: 'bm-scripts.js',
        file: '<%= paths.dest %>/js/bm-scripts.js'
      },
      scriptsVendor: {
        replace: ['<%= paths.dest %>/**/*.html'],
        replacement: 'vendor-scripts.js',
        file: '<%= paths.dest %>/js/vendor-scripts.js'
      }
    },

    clean: {
      build: {
        src: ['<%= paths.dest %>/**/*']
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          base: '<%= paths.dest %>',
          open: {
            appName: 'Google Chrome'
          }
        }
      }
    },

    concat: {
      options: {
        separator: '\n;\n'
      },
      app: {
        src: [
          'js/app.js',
          'js/app/**/*.js'
        ],
        dest: '<%= paths.dest %>/js/bm-scripts.js'
      },
      vendor: {
        src: [
          // jQuery
          'bower_components/jquery/dist/jquery.js',

          // Twitter Bootstrap scripts, commenting out the unused features
          'bower_components/bootstrap/js/transition.js',
          'bower_components/bootstrap/js/alert.js',
          'bower_components/bootstrap/js/button.js',
          'bower_components/bootstrap/js/carousel.js',
          'bower_components/bootstrap/js/collapse.js',
          'bower_components/bootstrap/js/dropdown.js',
          'bower_components/bootstrap/js/modal.js',
          'bower_components/bootstrap/js/tooltip.js',
          'bower_components/bootstrap/js/popover.js',
          'bower_components/bootstrap/js/scrollspy.js',
          'bower_components/bootstrap/js/tab.js',
          'bower_components/bootstrap/js/affix.js',

          // jQuery Visible
          'bower_components/jquery-visible/jquery.visible.js'
        ],
        dest: '<%= paths.dest %>/js/vendor-scripts.js',
      },
    },

    copy: {
      favicon: {
        files: [
          {expand: true, src: ['favicon.ico', 'apple-touch-icon.png'], dest: 'build'},
        ]
      },
      fonts: {
        files: [
          {expand: true, flatten: true, src: ['bower_components/bootstrap/fonts/*.*'], dest: '<%= paths.dest %>/fonts'},
          {expand: true, src: ['fonts/*.*'], dest: '<%= paths.dest %>'}
        ]
      },
      html: {
        files: [
          {expand: true, src: ['components/**/*.html'], dest: 'build'}
        ]
      },
      images: {
        files: [
          {expand: true, src: ['images/**/*.*'], dest: '<%= paths.dest %>'}
        ]
      },
      php: {
        files: [
          {expand: true, src: ['server/**/*.php'], dest: '<%= paths.dest %>'}
        ]
      }
    },

    imagemin: {
      images: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['images/**/*.{png,gif,jpg}'],
          dest: 'images/'
        }]
      },
      favicon: {
        files: [{
          expand: true,
          src: ['apple-touch-icon.png']
        }]
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        browser: true,
        curly: true,
        eqnull: true,
        eqeqeq: true,
        undef: true,
        devel: true,
        ignores: [],
        globals: {
          butcher: true,
          grecaptcha: true
        }
      },
      files: {
        src: ['js/**/*.js']
      }
    },

    less: {
      development: {
        src: 'less/bm-styles.less',
        dest: '<%= paths.dest %>/css/bm-styles.css'
      },
      production: {
        options: {
          cleancss: true
        },
        src: 'less/bm-styles.less',
        dest: '<%= paths.dest %>/css/bm-styles.css'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      app: {
        src: '<%= paths.dest %>/js/bm-scripts.js',
        dest: '<%= paths.dest %>/js/bm-scripts.js'
      },
      vendor: {
        src: '<%= paths.dest %>/js/vendor-scripts.js',
        dest: '<%= paths.dest %>/js/vendor-scripts.js'
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: 'less/**/*.less',
        tasks: ['less'],
        options: {
          spawn: false
        }
      },
      data: {
        files: ['data/**/*.yaml'],
        tasks: ['assemble'],
        options: {
          spawn: false
        }
      },
      handlebars: {
        files: ['templates/**/*.hbs'],
        tasks: ['assemble'],
        options: {
          spawn: false
        }
      },
      images: {
        files: ['images/**/*.*'],
        tasks: ['copy:images'],
        options: {
          spawn: false
        }
      },
      php: {
        files: ['server/**/*.php'],
        tasks: ['copy:php'],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: 'js/**/*.js',
        tasks: ['jshint', 'concat:app'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-cache-busting');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['clean:build', 'less:development', 'jshint', 'concat', 'assemble', 'copy', 'connect', 'watch']);
  grunt.registerTask('build', ['clean:build', 'less:production', 'concat', 'imagemin', 'assemble', 'copy', 'uglify', 'cache-busting']);
};
