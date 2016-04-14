(function(gulp, gulpLoadPlugins) {
  'use strict';
  var $ = gulpLoadPlugins({pattern: '*', lazy: true}),
      _ = {
        sass: './_scss',
        js:   './js',
        css:  './css',
        img:  './img'
      };
  var messages = {
    jekyllBuild: '<span style="color: #ccc">Running:</span> $ jekyll build ...'
  };
  var cp = require('child_process');

  function handleError(error){
    console.log(error.message);
    this.emit('end');
  }

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ Build the Jekyll Site
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('jekyll-build', function(done) {
    $.browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
      .on('close', done);
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ Rebuild Jekyll & do page reload
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
    $.browserSync.reload();
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ Wait for jekyll-build, then launch the Server
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('browser-sync', ['sass', 'js', 'jekyll-build'], function() {
    $.browserSync({
      ui: false,
      server: {
        baseDir: '_site',
        routes: {"/blog": "_site"}
      },
      startPath: '/blog',
      port: 9000
    });
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ jshint - js files test
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('jshint', function() {
    return gulp.src([ 'gulpfile.js' , _.js + '/**/*.js'])
      .pipe($.jshint('.jshintrc'))
      .pipe($.jshint.reporter('jshint-stylish'));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ scsslint - scss files test
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('scsslint', function() {
    return gulp.src([_.sass + '/**/*.scss'])
      .pipe($.scssLint({
        'config': '.scsslintrc',
        'customReport': $.scssLintStylish
      }));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ Compile files from _scss into both _site/css (for live injecting)
  //|   and site (for future jekyll builds)
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('sass', function () {
    return gulp.src(_.sass + '/**/*.scss')
      .pipe($.plumber({ errorHandler: handleError}))
      .pipe($.sourcemaps.init())
      .pipe($.sass({
        outputStyle: 'compressed',
        onError: $.browserSync.notify
      }))
      .pipe($.autoprefixer(['last 15 versions', '> 1%', 'ie 8']))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('_site/css'))
      .pipe($.browserSync.reload({stream:true}))
      .pipe(gulp.dest(_.css));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ Compile files from js into _site/js (for live injecting)
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('js', function(){
    return gulp.src(_.js + '/**/*.js')
      .pipe($.plumber())
      .pipe($.uglify())
      .pipe(gulp.dest('_site/js'))
      .pipe($.browserSync.reload({stream:true}));
  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ Watch scss files for changes & recompile
  //|   Watch html/md files, run jekyll & reload BrowserSync
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('watch', function () {
      gulp.watch(_.sass + '/**/*.scss', ['sass']);
      gulp.watch(_.js + '/**/*.js', ['js']);
      gulp.watch(['*.{html,md}', '_includes/*', '_layouts/*', '_posts/*', _.img + '/**/*.{jpg,png}'], ['jekyll-rebuild']);

  });

  //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //| ~ Default task, running just `gulp` will compile the sass,
  //|   compile the jekyll site, launch BrowserSync & watch files.
  //|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  gulp.task('default', ['browser-sync', 'watch']);
  gulp.task('test',  ['jshint', 'scsslint']);

}(require('gulp'), require('gulp-load-plugins')));
