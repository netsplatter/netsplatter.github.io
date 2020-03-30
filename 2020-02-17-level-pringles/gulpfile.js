const gulp = require('gulp');
const browserSync = require('browser-sync').create();

// Variables
const isDevelop = !process.env.NODE_ENV ||  process.env.NODE_ENV == 'development';

const paths = {
    styles: {
      src: './scss/site.scss',
      output: 'css/'
    },
    include: {
      src: './gulp-tasks'
    },
    default: {
      output: 'dist/assets/',
      proxy: 'http://localhost:21002'
    }
  };

const lazyRequireTask = (taskName, path, options) => {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, (callback) => {
    const task = require(path).call(this, options);
    return task(callback);
  });
};

// Frontend
lazyRequireTask('style', `${paths.include.src}/style`, {
  src: paths.styles.src,
  output: paths.styles.output,
  isDevelop,
  browserSync: browserSync
});

lazyRequireTask('serve', `${paths.include.src}/serve`, {
  pathServer: paths.default.proxy,
  pathWatch: `${paths.default.output}/**/*.*`,
  browserSync: browserSync
});

// Modes
gulp.task('build', gulp.series('style'));

gulp.task('dev', gulp.series('build', 'serve'));
