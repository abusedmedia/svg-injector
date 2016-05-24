var fs = require('fs')
var path = require('path')
var jsdom = require('jsdom')

function svgInjectr(options, cllb) {

    var that = this;
    
    var srcpath = path.join('', options.source);
    var folderpath = path.dirname(srcpath)
    
    var selector = (options.selector) ? options.selector : 'svg-inject'

    var jQueryFile = fs.readFileSync(require.resolve("jquery"), "utf8");

    var func = function (window) {
        var $ = window.$;

        var svg_container_tag = $('[' + selector + ']');

        svg_container_tag.each(function(i, e){

            var el = $(e)
            var svg_path = el.attr(selector);

            var svgpath = path.join(folderpath, svg_path);
            
            var svgSource;
            try {
                svgSource = fs.readFileSync(svgpath, "utf8");

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

                if(options.removeAttr){
                    el.removeAttr(selector)
                }

                el.append(svg)
            } catch (e) {
                console.log("svg "+svgpath+" failed to load: "+e);
            }
            
        })
        
        if(cllb){
            $('.jsdom').remove() // this is fun, remove jsdom with jsdom
            var _out = window.document.documentElement.outerHTML
            cllb(_out)
        }
        
    }



    jsdom.env({
        file:options.source,
        src:[jQueryFile], 
        done:function (err, window) {
            if (err) {
                throw new Error("There were errors: "+err);
            }
            func(window);
        }
    });




};


module.exports = svgInjectr