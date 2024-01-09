const gulp = require('gulp');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

// Source Path
const jsSrc = './src/js/*.js';

// Dist Path
const jsDist = './dist/js';
const jsDistName = 'scripts.js';

// Minify e Concat Scripts
gulp.task('scripts', () => gulp.src(jsSrc)
  .pipe(plumber())
  .pipe(uglify())
  .pipe(concat(jsDistName))
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest(jsDist)));
