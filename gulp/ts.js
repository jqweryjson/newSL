'use strict';

const config = require('../gulpconfig'),
    ts = require("gulp-typescript"),
    gulp = require('gulp');

gulp.task('ts', function() {
    var tsResult = gulp.src('./app/*.ts')
        .pipe(ts({
              noImplicitAny: true,
              out: "output.js"
        }));
    return tsResult.js.pipe(gulp.dest(config.dist+'/css'));//плюем в директорию
});
