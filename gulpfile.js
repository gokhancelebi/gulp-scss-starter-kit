/**
 * npm install --global gulp-cli
 * npm install gulp gulp-sass sass gulp-clean-css gulp-uglify --save-dev
 *
 * After all, run "gulp" command on cmd
 *
 */
const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const gulpCleanCss = require('gulp-clean-css');
const minifyJs = require('gulp-uglify');

function buildStyles() {
    // place code for your default task here
    return src('./assets/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpCleanCss({compatibility: 'ie8'}))
        .pipe(dest('./assets/build'));
}

function watchStyles() {
    watch('./assets/scss/**/*.scss', buildStyles);
}

function buildJs() {
    return src('./assets/js/app.js')
        .pipe(minifyJs())
        .pipe(dest('./assets/build'));
}

function watchJs() {
    watch('./assets/js/**/*.js', buildJs);
}


exports.default = series(buildStyles, buildJs, watchStyles, watchJs);