const gulp = require('gulp');

module.exports = ({browserSync, pathServer, pathWatch}) => {
  return () => {
    browserSync.init({
      proxy: pathServer
    });

    gulp.watch('./scss/**/*.*', gulp.series('style'));
    browserSync.watch(pathWatch).on('change', browserSync.reload);
  }
};
