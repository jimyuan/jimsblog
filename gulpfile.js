(function(gulp, gulpLoadPlugins) {
  const $ = gulpLoadPlugins({ pattern: ['*'] })
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
  const browserSync = $.browserSync.create()
  const reload      = browserSync.reload
  // jekyll build
  const buildCall   = (done, origin = true) => {
    const cp = require('child_process')
    const subCmd = origin ? ['build'] : ['build', '--incremental']
    browserSync.notify(msg.jekyllBuild)
    return cp.spawn('jekyll', subCmd, {stdio: 'inherit'}).on('close', done)
  }
  
  // original build
  gulp.task('jekyll', buildCall)
  
  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ Build the Jekyll Site
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('jekyll-build', done => {
    buildCall(done, false)
  })

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ Rebuild Jekyll & do page reload
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('jekyll-rebuild', ['jekyll-build'], done => {
    reload()
    done()
  })

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ Wait for jekyll-build, then launch the Server
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('browser-sync', ['sass', 'js', 'jekyll-build'], () => {
    browserSync.init({
      ui: false,
      server: {
        baseDir: '_site',
        routes: {'/blog': '_site'}
      },
      startPath: '/blog',
      port: 9000
    })
  })

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ Compile files from _scss into both _site/css (for live injecting)
  //|   and site (for future jekyll builds)
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('sass', () => gulp
    .src(`${_.sass}/**/*.scss`)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      onError: browserSync.notify
    }))
    .pipe($.autoprefixer({
      browsers: ['last 5 versions', 'ie > 9']
    }))
    .pipe($.cleanCss())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(`${_.dist}/css`))
    .pipe(browserSync.stream())
    .pipe(gulp.dest(_.css))
  )

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ Compile files from js into _site/js (for live injecting)
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('js', () => gulp
    .src(`${_.js}/**/*.js`)
    .pipe($.plumber())
    .pipe($.uglify())
    .pipe(gulp.dest(`${_.dist}/js`))
  )

  gulp.task('js-watch', ['js'], done => {
    reload()
    done()
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ Watch scss files for changes & recompile
  //|   Watch html/md files, run jekyll & reload BrowserSync
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('watch', () => {
    gulp.watch(`${_.sass}/**/*.scss`, ['sass'])
    gulp.watch(`${_.js}/**/*.js`, ['js-watch'])
    gulp.watch([
      '_includes/*',
      '_layouts/*',
      '_posts/*',
      '*.{html, md}',
      `${_.img}/**/*.{jpg, png}`
    ], ['jekyll-rebuild'])
  })

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ Default task, running just `gulp` will compile the sass,
  //|   compile the jekyll site, launch BrowserSync & watch files.
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('default', ['browser-sync', 'watch'])
}(require('gulp'), require('gulp-load-plugins')))
