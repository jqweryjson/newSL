'use strict';

const gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    webpackConfig = require('../webpack.config.js');

function webpackCompile(env, callback) {
    return webpack(webpackConfig(env), function(err, stats) {
        if (stats.compilation.errors.length) gutil.beep();
        if (err) throw new gutil.PluginError('Webpack', err);
        gutil.log('Webpack', stats.toString({
            colors: true
        }));
        callback();
    });
}
//типа на девелопмент
gulp.task('webpack:dev', function(callback) {  
    console.log(callback,'hereeee');
    webpackCompile('development', callback);
});


//типа на продакшен
gulp.task('webpack:prod', function(callback) {
    webpackCompile('production', callback);
});
