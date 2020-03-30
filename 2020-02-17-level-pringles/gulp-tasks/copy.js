const gulp = require('gulp');
const newer = require('gulp-newer');

module.exports = ({src, taskName, output}) => {
  return () => {
    return gulp.src(src, { since: gulp.lastRun(taskName) })
     .pipe(newer(output))
     .pipe(gulp.dest(output));
  }
};
