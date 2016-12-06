'use strict';

const config = require('../gulpconfig'),
    changed = require('gulp-changed'),
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    imageResize = require('gulp-image-resize'),
    svg2png = require('gulp-svg2png');

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
}

function vectorImageTransform(src, subfolder) {
    subfolder = subfolder || '';

    const imageminOptions = {
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        };

    return gulp.src(src)
        .pipe(changed(config.dist + '/images/svg/' + subfolder))
        .pipe(imagemin(imageminOptions))
        .pipe(gulp.dest(config.dist + '/images/svg/' + subfolder))
        .pipe(svg2png())
        .pipe(imagemin(imageminOptions))
        .pipe(gulp.dest(config.dist + '/images/svg/' + subfolder));
}

gulp.task('images', function() {
    rasterImageTransform([config.app + '/images/**/*.{png,jpg,gif}']);//собирем все изображения
    rasterImageTransform([config.app + '/blocks/**/*.{png,jpg,gif}'], 'blocks');
    vectorImageTransform([config.app + '/images/**/*.svg']);
    vectorImageTransform([config.app + '/blocks/**/*.svg'], 'blocks');
});
