'use-strict';

const gulp = require('gulp');
      const svgstore = require('gulp-svgstore');
      const svgmin = require('gulp-svgmin');
      const rename = require('gulp-rename');

module.exports = ({src, output}) => {
  return () => {
    return gulp.src(src)
      .pipe(svgmin({
        plugins: [{
          removeViewBox: false
        }]
      }))
      .pipe(svgstore())
      .pipe(rename('symbols.svg'))
      .pipe(gulp.dest(output));
  };
};
