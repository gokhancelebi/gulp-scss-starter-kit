// npm install gulp gulp-sass node-sass gulp-clean-css gulp-concat

var gulp = require('gulp'),
    sass = require('gulp-sass')(require("node-sass")),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat');

gulp.task('scss-concat', function () {
    return gulp.src([
        'assets/scss/reset.scss',
        'assets/scss/parts/*.scss',
        'assets/scss/main.scss',
        'assets/scss/mobile-md.scss',
        'assets/scss/mobile-sm.scss',
        'assets/scss/mobile-xs.scss'
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('bundle.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', function () {
    gulp.watch('assets/scss/parts/*.scss', gulp.series('scss-concat'));
    gulp.watch('assets/scss/*.scss', gulp.series('scss-concat'));
});
