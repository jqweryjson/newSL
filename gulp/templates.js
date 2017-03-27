'use strict';

const config = require('../gulpconfig'),
    browserSync = require('browser-sync'),
    gutil = require('gulp-util'),
    gulp = require('gulp'),
    formatter = require('gulp-jsbeautifier'),
    htmlhint = require('gulp-htmlhint'),
    fileinclude = require('gulp-file-include'),
    plumber = require('gulp-plumber'),   //подпишется на error для одного плагина, 
                                        //но и автоматически сделает это и для всех 
                                       //последующих плагинов, подключенных через pipe;;
    include = require("gulp-include");

const handleError = (error) => {
    notify({
        title: 'Compile error!',
        message: '<%= error.message %>' //Перехватываем ошибки и пишем их в окно гальпа
    }).write(error);
};

gulp.task('html', function() {
    const fileincludeOptions = {
            prefix: '@@',
            basepath: '@file',
            indent: true
        },
        htmlhintOptions = {
            'doctype-first': false
        };
    return gulp.src(config.app + '/html/*.html')
        .pipe(fileinclude(fileincludeOptions).on('error', function(err) {
            gutil.log(gutil.colors.red(err.message));
            gutil.beep();
            this.emit('end');
        }))
        .pipe(formatter({
            indentSize: 4,
            unformatted: ['code', 'pre'],
            extra_liners: []
        }))
        .pipe(htmlhint(htmlhintOptions))
        .pipe(htmlhint.reporter())
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(gulp.dest(config.dist))
        .pipe(browserSync.stream());
     });

gulp.task('templates', ['html']);
