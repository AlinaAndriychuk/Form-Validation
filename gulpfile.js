const {src, dest, watch, parallel} = require('gulp');

const scss = require('gulp-sass');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
};      

function styles() {
  return src('app/sass/style.sass')
  .pipe( scss({outputStyle: 'expanded'}) )
  .pipe( concat('style.min.css') )
  .pipe( dest('app/css') )
  .pipe( browserSync.stream() )
};

function scripts() {
  return src('app/js/main.js')
  .pipe( concat('main.min.js') )
  .pipe( uglify() )
  .pipe( dest('app/js') )
  .pipe( browserSync.stream() )
};

function watching() {
  watch(['app/sass/**/*.sass'], styles);
  watch(['app/js/main.js', '!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload)
};

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.default = parallel(scripts, browsersync, watching);