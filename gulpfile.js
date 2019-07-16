/**
 * Rewrite gulp file with gulp 4.
 * God bless me!
 */
const { src, dest, watch, parallel, series, task } = require('gulp')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const [ plumber, sourcemaps, autoprefixer, cleanCss, sass, uglify, cp ] = [
  require('gulp-plumber'),
  require('gulp-sourcemaps'),
  require('gulp-autoprefixer'),
  require('gulp-clean-css'),
  require('gulp-sass'),
  require('gulp-uglify'),
  require('child_process')
]
const _ = {
  sass: './_scss',
  js:   './js',
  css:  './css',
  img:  './img',
  dist: './_site'
}
const msg = {
  jekyllBuild: '<span style="color: #ccc">Running:</span> $ jekyll build ...'
}
const buildCall   = (done, origin = true) => {
  const subCmd = origin ? ['build'] : ['build', '--incremental']
  browserSync.notify(msg.jekyllBuild)
  return cp.spawn('jekyll', subCmd, {stdio: 'inherit'}).on('close', done)
}

/**
 * Build with Jekyll in complete mode
 */
task('jekyll', buildCall)

/**
 * Build with Jekyll in incremental mode
 */
task('jekyll-build', done => {
  buildCall(done, false)
})

task('jekyll-rebuild', series('jekyll-build', done => {
  reload()
  done()
}))

/**
* Compile files from _scss into both _site/css (for live injecting)
* and site (for future jekyll builds)
*/
task('sass', () => src(`${_.sass}/**/*.scss`)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    onError: browserSync.notify
  }))
  .pipe(autoprefixer({
    Browserslist: ['> 0.5%']
  }))
  .pipe(cleanCss())
  .pipe(sourcemaps.write('./'))
  .pipe(dest(`${_.dist}/css`))
  .pipe(browserSync.stream())
  .pipe(dest(_.css))
)

/**
 * Compile files from js into _site/js (for live injecting)
 */
 task('js', () => src(`${_.js}/**/*.js`)
   .pipe(plumber())
   .pipe(uglify())
   .pipe(dest(`${_.dist}/js`))
 )

 task('js-watch', parallel('js', reload))

 /**
  * Watch scss files for changes & recompile
  * Watch html/md files, run jekyll & reload BrowserSyn
  */
 task('watch', () => {
   watch(`${_.sass}/**/*.scss`, parallel('sass'))
   watch(`${_.js}/**/*.js`, parallel('js-watch'))
   watch([
     '_includes/*',
     '_layouts/*',
     '_posts/*',
     '*.{html, md}',
     `${_.img}/**/*.{jpg, png}`
   ], parallel('jekyll-rebuild'))
 })

/**
 * Wait for jekyll-build, then launch the Server
 */
task('browser-sync', series('sass', 'js', 'jekyll-build', () => {
  browserSync.init({
    ui: false,
    server: {
      baseDir: '_site',
      routes: {'/blog': '_site'}
    },
    startPath: '/blog',
    port: 9000
  })
}))

exports.default = parallel('browser-sync', 'watch')
