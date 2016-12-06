'use strict';

const config = require('./gulpconfig'),
    browserSync = require('browser-sync'),
    git = require('gulp-git'),
    gulp = require('gulp'),
    gutil = require('gulp-util');

require('./gulp/styles');
require('./gulp/templates');
require('./gulp/images');
require('./gulp/webpack');

gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: config.dist
    });

    gulp.watch(config.app + '/**/*.js', ['webpack:dev']);
    gulp.watch(config.app + '/**/*.scss', ['styles']);
    gulp.watch(config.app + '/**/*.html', ['html']);
    gulp.watch(config.app + '/**/*.{png,jpg,gif,svg}', ['images']);
    gulp.watch(config.dist + '/*.js').on('change', browserSync.reload);
});

gulp.task('build', ['styles', 'html', 'images', 'webpack:prod']);

gulp.task('default', ['serve']);

gulp.task('git', ['build'], function() {
    return gulp.src('./git/*')
        .pipe(git.add({
            args: 'assets/*'
        }))
        .pipe(git.commit('Frontend source').on('error', function(err) {
            gutil.beep();
            if (err) throw err;
        }))
        .pipe(git.add({
            args: 'public/*'
        }))
        .pipe(git.commit('Frontend build').on('error', function(err) {
            gutil.beep();
            if (err) throw err;
        }));
});
