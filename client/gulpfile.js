'use strict'

const gulp = require('gulp')
const connect = require('gulp-connect')
const del = require('del')
const runSequence = require('run-sequence')
const sass = require('gulp-sass')

const sourcePath = './src'
const publicPath = './public'
const sassRelativePath = '/styles'

const allSourcePath = `${sourcePath}/**/*`
const allPublicPath = `${publicPath}/**/*`
const allSassPath = `${sourcePath}${sassRelativePath}/**/*.scss`
const sassEntryPath = `${sourcePath}${sassRelativePath}/main.scss`
const staticPath = [allSourcePath, `!${allSassPath}`]


// CLEANERS
gulp.task('clean:all', () => del(allPublicPath))


// COPIERS
gulp.task('static:copy', () =>
  gulp.src(staticPath)
    .pipe(gulp.dest(publicPath)))


// COMPILERS
gulp.task('sass:compile', () => {
  gulp.src(sassEntryPath)
    .pipe(sass())
      .on('error', sass.logError)
    .pipe(gulp.dest(`${publicPath}/styles`))
})


// LIVERELOAD
gulp.task('connect', () =>
  connect.server({
    root: publicPath,
    livereload: true
  }))

gulp.task('livereload', () =>
  gulp.src(allPublicPath)
    .pipe(connect.reload()))


// WATCHERS
gulp.task('watch', () =>
  runSequence(
    'clean:all',
    'build',
    [
      'static:watch',
      'sass:watch',
      'connect'
    ]
  ))

gulp.task('static:watch', () =>
  gulp.watch(staticPath, () =>
    runSequence(
      'static:copy',
      'livereload'
    )))

gulp.task('sass:watch', () =>
  gulp.watch(allSassPath, () =>
  runSequence(
    'sass:compile',
    'livereload'
  )))


// BUILDERS
gulp.task('build', ['sass:compile', 'static:copy'])
