/**
 * Created by lzhan on 16/9/26.
 */

module.exports = function (grunt) {
    grunt.initConfig({pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
            },
            dist: {
                src: ['routes/index.js','routes/blog.js'],//src文件夹下包括子文件夹下的两个文件
                dest: 'routes/main.js'//合并文件目录
            }
        },
        uglify: {
            options: {banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'},
            build: {
                files: [
                    {
                    src: ['routes/main.js'],
                // src: 'public/javascripts/<%= pkg.name %>.js',
                // dest: 'public/dist/js/<%= pkg.name %>.<%= pkg.version %>.min.js'
                    dest: 'routes/dist/js/main.<%= pkg.version %>.min.js'
                    },
                    {
                    src : 'routes/javascripts/dateFormat.js',
                // src: 'public/javascripts/<%= pkg.name %>.js',
                // dest: 'public/dist/js/<%= pkg.name %>.<%= pkg.version %>.min.js'
                    dest : 'public/dist/js/dateFormat.min.js'
                    }
                ]
            }


},
        cssmin: {
            compress: {
                files: {
                    'public/dist/css/<%= pkg.name %>.<%= pkg.version %>.min.css': [
                        "public/stylesheets/*.css"
                    ]
                }
            }
        }
    });
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['concat','uglify','cssmin']);};

