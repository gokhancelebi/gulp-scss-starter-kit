/**
 * npm install --global gulp-cli
 * npm install gulp gulp-sass sass gulp-clean-css gulp-purgecss gulp-uglify --save-dev
 * 
 * If you dont want to remove unused css, remove "gulp-purgecss" from above command and remove "purgecss" from below code.
 *
 * After all, run "gulp" command on cmd
 *
 */

const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const gulpCleanCss = require('gulp-clean-css');
const minifyJs = require('gulp-uglify');
const purgecss = require('gulp-purgecss');

function buildStyles() {
    // place code for your default task here
    return src('./assets/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(purgecss({
            content: ['./**/*.html']
        }))
        .pipe(gulpCleanCss({compatibility: 'ie8'}))
        .pipe(dest('./assets/build'));
}
 
function buildJs() {
    return src('./assets/js/app.js')
        .pipe(minifyJs())
        .pipe(dest('./assets/build'));
}


function watchFiles() {
    watch(['./assets/scss/**/*.scss','./**/*.html'], buildStyles);
    watch('./assets/js/**/*.js', buildJs);
}

exports.default = series(buildStyles, buildJs, watchFiles);