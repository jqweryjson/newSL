'use strict';

const config = require('../gulpconfig'),
    changed = require('gulp-changed'),
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    imageResize = require('gulp-image-resize');

function rasterImageTransform(src, subfolder) {
    subfolder = subfolder || '';//если нет подкаталога то пустая строка

    const imageminOptions = {
            progressive: true,
            use: [pngquant()]
        },
        imageResizeOptions = {
            width: '50%',
            height: '50%',
            imageMagick: true
        };

    return gulp.src(src)
        .pipe(changed(config.dist + '/images/2x/' + subfolder))
        .pipe(imagemin(imageminOptions))
        .pipe(gulp.dest(config.dist + '/images/2x/' + subfolder))
        .pipe(changed(config.dist + '/images/1x/' + subfolder))
        .pipe(imageResize(imageResizeOptions))
        .pipe(imagemin(imageminOptions))
        .pipe(gulp.dest(config.dist + '/images/1x/' + subfolder));
};



gulp.task('images', function() {
    rasterImageTransform([config.app + '/images/**/*.{png,jpg,gif}']);//собирем все изображения
    rasterImageTransform([config.app + '/blocks/**/*.{png,jpg,gif}'], 'blocks');
});
