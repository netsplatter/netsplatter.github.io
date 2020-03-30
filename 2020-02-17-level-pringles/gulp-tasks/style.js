
const gulp = require('gulp');
      const gulpIf = require('gulp-if');
      const plumber = require('gulp-plumber');
      const notify = require('gulp-notify');
      const sass = require('gulp-sass');
      const sassGlob = require('gulp-sass-glob');
      const postcss = require('gulp-postcss');
      const autoprefixer = require('autoprefixer');
      const mqpacker = require('css-mqpacker');
      const postcssinlinesvg = require('postcss-inline-svg');
      const csso = require('gulp-csso');
      const rename = require('gulp-rename');
      const postcssflexbugsfixes = require('postcss-flexbugs-fixes');
      const sourcemaps = require('gulp-sourcemaps');

      sass.compiler = require('node-sass');

module.exports = ({src, output, isDevelop, browserSync}) => {
    return () => {
        return gulp.src(src)
          .pipe(plumber({
            errorHandler: notify.onError((err) => {
              return {
                title: 'Styles',
                message: err.message
              }
            })
          }))
          .pipe(gulpIf(isDevelop, sourcemaps.init()))
          .pipe(sassGlob())
          .pipe(sass())
          .pipe(postcss([
            autoprefixer(),
            postcssflexbugsfixes(),
            postcssinlinesvg(),
            //mqpacker({ sort: false })
          ]))
          .pipe(csso())
          .pipe(gulpIf(isDevelop, sourcemaps.write()))
          .pipe(rename('site.css'))
          .pipe(gulp.dest(output))
          .pipe(browserSync.stream());
    }
  };
