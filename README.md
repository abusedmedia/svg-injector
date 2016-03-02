# svg-injector


### Usage example

```

var svgInject = require('svg-injector')

var options = {source:'test/test.html', selector:'svg_load'}

svgInject(options, function(res){
	console.log(res)
})

```

### options

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
