/** Compiled By kissy-xtemplate */
/*jshint quotmark:false, loopfunc:true, indent:false, asi:true, unused:false, boss:true, sub:true*/
var itemPicHtml = function (scope, buffer, undefined) {
    var tpl = this, nativeCommands = tpl.root.nativeCommands, utils = tpl.root.utils;
    var callFnUtil = utils['callFn'], callCommandUtil = utils['callCommand'], eachCommand = nativeCommands['each'], withCommand = nativeCommands['with'], ifCommand = nativeCommands['if'], setCommand = nativeCommands['set'], includeCommand = nativeCommands['include'], parseCommand = nativeCommands['parse'], extendCommand = nativeCommands['extend'], blockCommand = nativeCommands['block'], macroCommand = nativeCommands['macro'], debuggerCommand = nativeCommands['debugger'];
    buffer.write('<!--\u4E3B\u56FE\u7247\u533A \u6A21\u5757-->\r\n<div class="mod-gallery ks-scroll-view" id="mod-gallery" data-spm="991222349">\r\n    <ul class="J_pic mod-gallery-picpanel ks-scroll-view-content">\r\n\r\n    </ul>\r\n</div>\r\n\r\n\r\n<script>\r\n    KISSY.use("detail/mod", function(S,Mod) {\r\n        Mod.add({\r\n            name:"detail/gallery/",\r\n            data:{\r\n                container: "#mod-gallery",\r\n                sname: "itemPic",\r\n                response: JSON.parse(S.unEscapeHTML(\'', 0);
    var option0 = { escape: 1 };
    var params1 = [];
    var id2 = scope.resolve([
            'itemPic',
            'data'
        ], 0);
    params1.push(id2);
    option0.params = params1;
    var callRet3;
    callRet3 = callFnUtil(tpl, scope, option0, buffer, ['objToStr'], 0, 16);
    if (callRet3 && callRet3.isBuffer) {
        buffer = callRet3;
        callRet3 = undefined;
    }
    buffer.write(callRet3, true);
    buffer.write('\'))\r\n            }\r\n        });\r\n    });\r\n</script>\r\n', 0);
    return buffer;
};
itemPicHtml.TPL_NAME = module.name;
itemPicHtml.version = '5.0.0';
module.exports = itemPicHtml;