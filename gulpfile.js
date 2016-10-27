var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var nodemon = require('nodemon');
var browserSync = require('browser-sync');
var watchify = require('watchify');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var openWebpage = require('open');
var webserver = require('gulp-webserver');

var production = process.env.NODE_ENV === 'production';

function handleError(task) {
  return function(err) {
    gutil.log(gutil.colors.red(err));
    notify.onError(task + ' failed, check the logs..')(err);
  };
}

function scripts(watch) {
  var bundler, rebundle;
  bundler = browserify('./src/app.js', {
    basedir: __dirname, 
    debug: !production, 
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: watch // required to be true only for watchify
  });
  if(watch) {
    bundler = watchify(bundler) 
  }

  bundler.transform(reactify);

  rebundle = function() {
    var stream = bundler.bundle();
    stream.on('error', handleError('Browserify'));
    stream = stream.pipe(source('bundle.js'));
    // return stream.pipe(gulp.dest('./assets/js'));
    return stream.pipe(gulp.dest('./dist/js'));
  };

  bundler.on('update', rebundle);
  return rebundle();
}

function startBrowserSync() {
  browserSync.init(null, {
    ports: {
      min: 3001,
      max: 3002
    }
  });
}

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      fallback: 'index.html'
      // open: true
    }));
});

gulp.task('develop', ['move'], function () {
  nodemon({
    script: './src/app.js',
    ext: 'html js',
    env: { 'NODE_ENV': 'development'},
    stdout: false,
    stderr: false,
    nodeArgs: ['--debug'],
    watch: ['src/']
  });

  nodemon.on('restart', function (files) {
    gutil.log('[server] App restarted due to: ', gutil.colors.cyan(files));
  }).on('stdout', function(raw) {
    var msg = raw.toString('utf8');
    gutil.log('[server]', gutil.colors.green(msg));
    if(msg.indexOf('avisi-website has started') !== -1) {
      // lintScripts();
      browserSync.reload();
    }
  }).on('stderr', function(err) {
    var msg = err.toString('utf8');

    // For some reason debugger attachment gets logged on 'stderr', so we catch it here...
    if (msg.indexOf('debugger listening on port') === 0) {
      gutil.log('[server]', gutil.colors.green(msg));
    } else {
      handleError('Node server')(msg);
    }
  });
});

gulp.task('move', function() {
  // return gulp.src(['src/themify-icons/**']).pipe(gulp.dest('assets/css'));
});

gulp.task('scripts', function() {
  return scripts(false);
});

gulp.task('watchScripts', function() {
  return scripts(true);
});

gulp.task('browser-sync', ['develop'], function() {
  startBrowserSync();
  setTimeout(function() {
    // openWebpage('http://localhost:3000');
  }, 3000);
});

gulp.task('default', ['watchScripts', 'browser-sync']);