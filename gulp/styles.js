'use strict';

const config = require('../gulpconfig'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    cssBase64 = require('gulp-css-base64'),
    cssnano = require('gulp-cssnano'),
    gutil = require('gulp-util'),
    gulp = require('gulp'),
    header = require('gulp-header'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),   //подпишется на error для одного плагина, 
                                        //но и автоматически сделает это и для всех 
                                       //последующих плагинов, подключенных через pipe;;
    assets = require('postcss-assets');

const handleError = (error) => {
    notify({
        title: 'Compile error!',
        message: '<%= error.message %>' //Перехватываем ошибки и пишем их в окно гальпа
    }).write(error);
};


function stylesTransform(src, dist) {
    let autoprefixerBrowsers = ['last 5 version', 'safari 6', 'ie 8', 'ie 9'];//префиксы для броузеров

    if (dist === 'mobile.bundle.css') {//если строка равна строке мобилки то только две последние версии файлов
        autoprefixerBrowsers = ['last 5 version'];
    }

    return gulp.src(config.app + src)//возвращаем директорию из которой будем брать файл
        .pipe(sourcemaps.init())//пишем карту
        .pipe(plumber({
            errorHandler: handleError
        }))
       .pipe(sass().on('error', function(err) {
            gutil.log(gutil.colors.red(err.message));//утилита для гальпа чтопы ошибки были красного цвета
            gutil.beep();//это я так понял звук для ошибки
            this.emit('end');//типа стопим если ошибка
        }))
        .pipe(postcss([assets({
            loadPaths: ['../public/images']//ходит по изображениям и вставляет ширину и высоту
        })]).on('error', function(err) {
            gutil.log(gutil.colors.red(err.message));
            gutil.beep();
            this.emit('end');
        }))
        .pipe(autoprefixer({
            browsers: autoprefixerBrowsers,//собсна префиксируем брозеры
        }))
        .pipe(cssBase64({
            baseDir: '../public'//подствляет бэйс64 вместо url для изображений и фонтов
        }))
        .pipe(cssnano())//сжимаем
        .pipe(header(config.banner))//ставим хидер в файл
        .pipe(concat(dist))//собирем тока что?
        .pipe(sourcemaps.write('./map'))//пишем карту
        .pipe(gulp.dest(config.dist+'/css'))//плюем в директорию
        .pipe(browserSync.stream({
            match: '**/*.css'//типа хак для соурс мэпов
        }));
}

gulp.task('styles', function() {//запускаем сборку стилей
    stylesTransform('/common.scss', 'desktop.bundle.css');//вызываем функцию и передаем главный файл стилей и строку 
    if (config.mobile) {//если конфига для мобилки(стоит флаг тру)
        stylesTransform('/common-mobile.scss', 'mobile.bundle.css');//то эта функция вызывается с другим файлом и другой строкой
    }
});
