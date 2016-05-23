# svg-injectr

Simple module to inject external svg file into a html markup.
It also strip away the Adobe Illustrator document if present as well as additional comments.

### Usage example

```

var svgInject = require('svg-injectr')

var options = {source:'test/test.html', selector:'svg_load'}

svgInject(options, function(res){
	console.log(res)
})

```

### options



### Gulp plugin

You can use this module in a gulp pipeline with:

```
var gulp = require('gulp')
var svgInject = require('svg-injectr')
var through = require('through2');

gulp.task('default', function(){
  gulp.src('myfile.html')
    .pipe(through.obj(function (chunk, enc, cb) {
      svgInject({source:chunk.path, selector:'svg_load'}, function(res){
        chunk.contents = new Buffer(res)
        cb(null, chunk);
      })
    }))
    .pipe(gulp.dest('dist'))
})
```

#### source

The html source file path

#### selector

The attribute selector used to store each svg path. Default is ```svg_load```.

Given this tag:

	<div svg_load="asssets/icon.svg"></div>

The script will return something like:

	<div>
		<svg>
			....
		</svg>
	</div>

Svg paths needs to be relative to the source file path


#### runtime loading for development purpose

This plug-in inject svg at built time. For development purpose is much more confortable loading svg at run-time using javascript and ajax requests.
You can include the following jquery-dependent code to do that:

  function gHandleSvgLoading (svg_loaded) {
    function loadSvg (element, path) {
        return $.get(path)
         .done(function (result) {
            $(element).append(result.documentElement)
            svg_loaded.push(path)
          })
         .fail(function () {
            console.error(this)
          })
    }
    $.holdReady(true)
    var svgsPromises = []
    $("div[data-svg*='assets/svg']").each(function () {
      var self = this
      var path = $(self).attr('data-svg')
      svgsPromises.push(loadSvg(self, path))
    })
    $.when.apply($, svgsPromises).then(function(){
      $.holdReady(false)
    })
  }



# License

Copyright (c) 2015 abusedmedia

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
