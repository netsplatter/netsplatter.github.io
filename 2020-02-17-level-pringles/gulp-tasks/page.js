

const gulp = require('gulp');
      const posthtml = require('gulp-posthtml');
      const include = require('posthtml-include');

module.exports = ({src, output}) => {
  return () => {
    return gulp.src(src)
      .pipe(posthtml([
          include()
      ]))
      .pipe(gulp.dest(output));
  };
};