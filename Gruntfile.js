module.exports = function (grunt) {
    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),

            connect: {
                server: {
                    options: {
                        base: 'public'
                    }
                }
            },

            bower: {
              install: {
                options: {
                  copy: false
                }
              }
            },

            clean: {
                html: ['public/*']
            },

            copy: {
                html: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= pkg.htmlSource %>/',
                            src: ['**/*'],
                            dest: '<%= pkg.htmlDestination %>/'
                        }
                    ]
                },
                images: {
                    files: [
                        {
                            expand: true, 
                            cwd: '<%= pkg.imgSource %>/',
                            src: ['**/*'], 
                            dest: '<%= pkg.imgDestination %>/'
                        }
                    ]
                },
                fonts: {
                    files: [
                        {
                            expand: true, 
                            cwd: '<%= pkg.fontsSource %>/',
                            src: ['**/*'], 
                            dest: '<%= pkg.fontsDestination %>/'
                        }
                    ]
                }
            },

            jshint: {
                all: ['<%= pkg.jsSource %>/**/*.js']
            },

            concat: {
                dist: {
                    files: {
                        '<%= pkg.jsDestination %>/<%= pkg.name %>.js': ['<%= pkg.jsSource %>/**/*.js', '<%= pkg.jsSource %>/app.js']
                    }
                },
                vendor: {
                  files: {
                    '<%= pkg.jsDestination %>/vendor.js': [
                        'bower_components/gsap/src/uncompressed/TweenLite.js',
                        //'bower_components/cordova/cordova.ios.js',
                        'bower_components/angular/angular.js'
                    ]
                  }
                }
            },

            uglify: {
                dist: {
                    files: {
                        '<%= pkg.jsDestination %>/<%= pkg.name %>.min.js': ['<%= pkg.jsDestination %>/<%= pkg.name %>.js'],
                        '<%= pkg.jsDestination %>/vendor.min.js': ['<%= pkg.jsDestination %>/vendor.js']
                    }
                }
            },

            sass: {
                dist: {
                    options: {
                        style: 'expanded'
                    },
                    files: {
                        '<%= pkg.cssDestination %>/<%= pkg.name %>.css': '<%= pkg.sassSource %>/<%= pkg.name %>.scss'
                    }
                }
            },

            cssmin: {
                compress:{
                    files:{
                        "<%= pkg.cssDestination %>/<%= pkg.name %>.min.css":["<%= pkg.cssDestination %>/<%= pkg.name %>.css"]
                    }
                }
            },

            notify_hooks: {
                options: {
                    enabled: true,
                    max_jshint_notifications: 5, // maximum number of notifications from jshint output
                    title: "Project Name", // defaults to the name in package.json, or will use project directory's name
                    success: false, // whether successful grunt executions should be notified automatically
                    duration: 3 // the duration of notification in seconds, for `notify-send only
                }
            },

            watch: {
                options: {
                    livereload: true
                },
                js: {
                    files: [
                        '<%= pkg.jsSource %>/**/*' ],
                    tasks: ['jshint','concat:dist', 'uglify:dist']
                },
                sass: {
                    files: ['<%= pkg.sassSource %>/**/*'],
                    tasks: ['sass', 'cssmin']
                },
                html: {
                    files: ['<%= pkg.htmlSource %>/**/*']
                }
            }
        });

    grunt.registerTask('default', [
      'bower:install',
      'jshint', 
      'clean', 
      'copy',
      'concat', 
      'uglify',
      'sass',
      'cssmin',
      'notify_hooks'
    ]);
    grunt.registerTask('build', ['default']);
    grunt.registerTask('serve', ['default', 'connect', 'watch']);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-notify');
};
