'use strict';
var gulp = require('gulp');

var config = require('./gulp/config'),
  files = config.files,
  fileCollections = config.fileCollections;


var styles = require('./styles');
var inject = require('./inject');

function watch() {
  return gulp.task('watch', function () {
    gulp.watch(files.styles, styles.compileStyles);
    gulp.watch(fileCollections.scriptsAndStyles, inject.injectJsAndCss);
  });
}


module.exports = {
  watch: watch
};