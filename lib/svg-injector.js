/*
Node CLI that:
- accepts an html string as input or a file path to load or an array of files? depends how other cli works
- return cleanup html string with svg injected

Bonus track
- make a grunt plugin
- make a gulp plugin
*/


var fs = require('fs')
var path = require('path')
var jsdom = require('jsdom')

function svgInjector(options, cllb) {

    var that = this;
	
    var srcpath = path.join(process.cwd(), options.source);
    var folderpath = path.dirname(srcpath)
    
    var htmlSource = fs.readFileSync(srcpath, "utf8");
    var selector = (options.selector) ? options.selector : 'svg-inject'

    call_jsdom(htmlSource, function (window) {
        var $ = window.$;

        var svg_container_tag = $('[' + selector + ']');

        svg_container_tag.each(function(i, e){

            var el = $(e)
            var svg_path = el.attr(selector);

            var svgpath = path.join(folderpath, svg_path);
            var svgSource = fs.readFileSync(svgpath, "utf8");

            // strip comments
            svgSource = svgSource.replace(/<!--[\s\S]*?-->/g, '')

            var temp = $('<div id="temp"></div>')
            temp.append(svgSource);

            var svg = temp.find('svg')

            // strip away the AI document
            svg.find('#adobe_illustrator_pgf').remove()
            svg.find('foreignobject').remove()
            var svgcontent = svg.find('switch > g').remove()
            svg.find('switch').remove()
            svg.append(svgcontent);

            el.append(svg)

            el.removeAttr(selector);
        })
        
        if(cllb){
            $('.jsdom').remove() // this is fun, remove jsdom with jsdom
            var _out = window.document.documentElement.outerHTML
            cllb(_out)
        }
        
    });


    function call_jsdom(source, callback) {
        jsdom.env(
            source,
            [ 'http://code.jquery.com/jquery-2.1.4.min.js' ], 
            function(errors, window) { 
                process.nextTick(
                    function () {
                        if (errors) {
                            throw new Error("There were errors: "+errors);
                        }
                        callback(window);
                    }
                );
            }
        );
    }




};


module.exports = svgInjector
