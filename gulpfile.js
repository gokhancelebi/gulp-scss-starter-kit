/**
 * npm install --global gulp-cli
 * npm install gulp gulp-sass sass gulp-clean-css --save-dev
 *
 * After all, run "gulp" command on cmd
 *
 */
const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const gulpCleanCss = require('gulp-clean-css');

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

exports.default = series(buildStyles, watchStyles);