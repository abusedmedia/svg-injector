var svgInject = require('../lib/svg-injectr')

var options = {source:'example/test.html', selector:'svg_load'}

svgInject(options, function(res){
	console.log(res)
})

