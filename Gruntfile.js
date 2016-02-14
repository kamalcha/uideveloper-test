module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            root: 'src',
            dist: 'dist',
            assets: '<%= config.dist %>/assets',
        },

        uglify: {
            dist: {
                files: {
                    '<%= config.assets %>/js/main.min.js': 'src/assets/js/main.js'
                }
            }
        },

        // Compile Sass to CSS
        sass: {
            dist: {
                options: {
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'src/assets/sass',
                    src: ['*.scss'],
                    dest: '<%= config.assets %>/css',
                    ext: '.css'
                }]
            }
        },

        // Autoprefixer
        autoprefixer: {
            dist: {
                src: '<%= config.assets %>/css/main.css'
            },
        },

        // Connect & Livereload task
        connect: {
            options: {
                port: 8800,
                hostname: '0.0.0.0',
                livereload: 35728
            },
            livereload: {
                options: {
                    open: true,
                    base: '<%= config.dist %>'
                }
            }
        },

        // Watch task
        watch: {
            gruntfile: {
                files: ['Gruntfile.js']
            },
            uglify: {
                files: ['src/assets/js/**/*.js'],
                tasks: ['uglify']
            },
            sass: {
                files: ['src/assets/sass/**/*.{scss,sass}'],
                tasks: ['sass']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '{,*/}*.html',
                    '<%= config.assets %>/css/*.css',
                    '<%= config.assets %>/js/*.js'
                ]
            }
        }

    });
 
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
    grunt.registerTask('default', ['uglify','sass','autoprefixer','connect:livereload','watch']);
};