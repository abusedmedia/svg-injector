/*
sample gulp file to use this module in a gulp chain
*/


var gulp = require('gulp')
var svgInject = require('svg-injectr')
var through = require('through2');



gulp.task('default', function(){
  gulp.src('example/test.html')
    .pipe(through.obj(function (chunk, enc, cb) {
      svgInject({source:chunk.path, selector:'svg_load'}, function(res){
        chunk.contents = new Buffer(res)
        cb(null, chunk);
      })
    }))
    .pipe(gulp.dest('public'))
})