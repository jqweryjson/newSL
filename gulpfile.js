'use strict';

const config = require('./gulpconfig'),
    browserSync = require('browser-sync'),
    git = require('gulp-git'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    ngrok = require('ngrok');

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
    gulp.watch(config.app + '/**/*.{svg,eot,ttf}', ['fonts']);
    gulp.watch(config.app + '/**/*.{png,jpg,gif,svg}', ['images']);
    gulp.watch(config.dist + '/*.js').on('change', browserSync.reload);
});

gulp.task('build', ['styles', 'html', 'fonts','images', 'webpack:prod']);

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

gulp.task('clean', function () {
    return gulp.src(config.dist, {read: false})
        .pipe(clean());
});

gulp.task('fonts', function () {
    return gulp.src(config.app+'/fonts/**/*.*')
          .pipe(gulp.dest(config.dist+'/fonts'))
});

const ngrok_config = {
    server: {
        baseDir: "public"
    },
    //tunnel: true,
    host: 'localhost',
    port: 8080,
    directoryListing: true,
    logPrefix: ''
};

gulp.task('webserver', function () {
    //browserSync(config);
    browserSync(ngrok_config, function (err, bs) {
       ngrok.connect({
                proto: 'http', // http|tcp|tls 
                addr: bs.options.get('port'), // port or network address 
            }, function (err, url) { 
                gutil.log('[ngrok]', ' => ',
                    'use ngrok http '+ngrok_config.port,' or ngrok http 192.168.10.10:80 -host-header=%site name%'
                    );
            });         
    });         
});