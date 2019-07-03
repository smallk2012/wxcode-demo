var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var cssnano = require('gulp-cssnano');
var header = require('gulp-header');
var autoprefixer = require('autoprefixer');
var pkg = require('./package.json');

gulp.task('watch', function() {
  gulp.watch('src/**', ['build:style','build:main']);
});
gulp.task('build:style', function() {
  var banner = [
    '/*!',
    ' * OoUI v<%= pkg.version %> (<%= pkg.homepage %>)',
    ' * Copyright <%= new Date()%> YingZaiQiDian.cn',
    ' * Licensed under the <%= pkg.license %> license',
    ' */',
    ''
  ].join('\n');
  /**
   * style目前内所有wxss
   * 压缩
   */
  gulp
    .src(['src/style/**/*.wxss'], { base: 'src' })
    .pipe(less())
    .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 4.1'])]))
    .pipe(
      cssnano({
        zindex: false,
        autoprefixer: false,
        discardComments: { removeAll: true }
      })
    )
    .pipe(header(banner, { pkg: pkg }))
    .pipe(
      rename(function(path) {
        path.extname = '.wxss';
      })
    )
    .pipe(gulp.dest('dist'));
});
gulp.task('build:main', function() {
  gulp
    .src(
      [
        'src/app.js',
        'src/app.json',
        'src/app.wxss',
        'src/sitemap.json',
        'src/config.js',
        'src/api/**',
        'src/images/**',
        'src/components/**',
        'src/pages/**',
        '!src/pages/*.wxss',
        'src/images/**',
        'src/utils/**'
      ],
      { base: 'src' }
    )
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch', 'build:style','build:main']);
