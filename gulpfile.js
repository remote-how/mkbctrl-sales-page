// GULP PACKAGES
// Most packages are lazy loaded
const gulp = require('gulp')
const babel = require('gulp-babel')
const fancylog = require('fancy-log')
const ansicolors = require('ansi-colors')
const filter = require('gulp-filter')
const plugin = require('gulp-load-plugins')()
const browserSync = require('browser-sync').create()

const LOCAL_URL = 'http://localhost:9000/'

// Source variables
const JS_SRC_DIR = './assets/js/src/'
const CSS_SRC_DIR = './assets/styles/src/'

const SOURCE = {
  srcProjectStyles: [
    `${CSS_SRC_DIR}**/*.scss`,
  ],
  srcCommonJs: [
    `${JS_SRC_DIR}common.js`,
  ],
}

const DIST = {
  root: './',
  distProjectStyles: 'assets/styles/dist',
  distProjectJs: 'assets/js/dist',
}

gulp.task('compileScripts', () => {
  // Use a custom filter so we only lint custom JS
  console.log(SOURCE.srcCommonJs)

  return gulp.src(SOURCE.srcCommonJs)
    .pipe(plugin.plumber(function (error) {
      fancylog.error(ansicolors.red(error.message))
        this.emit('end')
    }))
    .pipe(plugin.sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env'],
      compact: false,
    }))
    .pipe(plugin.concat('scripts-compiled.js'))
    .pipe(plugin.sourcemaps.write('.')) // Creates sourcemap for minified JS
    .pipe(gulp.dest(DIST.distProjectJs))
})

gulp.task('compileStyles', () => {
  console.log(SOURCE.srcProjectStyles)

  return gulp.src(SOURCE.srcProjectStyles)
    .pipe(plugin.plumber(function (error) {
      fancylog.error(ansicolors.red(error.message))
      this.emit('end')
    }))
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.sass())
    .pipe(plugin.autoprefixer({
      browsers: [
        'last 2 versions',
        'ie >= 9',
        'ios >= 7',
      ],
      cascade: false,
    }))
    .pipe(plugin.cssnano({zindex: false}))
    .pipe(plugin.sourcemaps.write('.'))
    .pipe(gulp.dest(DIST.distProjectStyles))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('browserSync', () => {
  console.log('Syncing browser...')

  // Files to watch
  const filesToWatch = [
    SOURCE.srcProjectStyles,
    SOURCE.srcCommonJs,
    DIST.distProjectStyles,
    DIST.distProjectJs,
    DIST.root
  ]

  browserSync.init(filesToWatch, {
    proxy: LOCAL_URL
  })

  gulp.watch(SOURCE.srcProjectStyles, gulp.parallel('compileStyles'))
  gulp.watch(SOURCE.srcCommonJs, gulp.parallel('compileScripts')).on('change', browserSync.reload)
})


gulp.task('watch', () => {
    // Watch .scss files
    gulp.watch(SOURCE.srcProjectStyles, gulp.parallel('compileScripts'))
    // Watch scripts files
    gulp.watch(SOURCE.srcCommonJs, gulp.parallel('compileStyles'))
})

gulp.task('default', gulp.parallel('compileScripts', 'compileStyles'))
