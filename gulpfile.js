const gulp = require('gulp')
const rename = require('gulp-rename')

gulp.task('babel', () => gulp.src(['src/**/*.js'])
  .pipe(require('gulp-babel')())
  .pipe(gulp.dest('dist'))
)

gulp.task('rollup', () => gulp.src(['src/index.js'])
  .pipe(require('gulp-better-rollup')(
    {
      plugins: [
        require('rollup-plugin-babel')({ // Nothing's ever easy: https://github.com/rollup/rollup-plugin-babel/issues/120
          babelrc: false,
          presets: [['env', { 'modules': false }]],
          exclude: 'node_modules/**',
        }),
        require('rollup-plugin-node-resolve')(),
        require('rollup-plugin-commonjs')(),
        require('rollup-plugin-uglify')(),
      ]
    },
    {
      moduleName: 'snabbdomModuleAframe',
      format: 'iife'
    }
  ))
  .pipe(rename({
    basename: 'snabbdom-module-aframe',
    suffix: '.min'
  }))
  .pipe(gulp.dest('dist'))
)

gulp.task('default', ['babel', 'rollup'], () => {})
