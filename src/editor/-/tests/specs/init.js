/**
 * init editor for test
 * @author yiminghe@gmail.com
 */

var editor;
var util = require('util');
var Editor = require('editor');
var cfg = {
    attachForm: true,
    baseZIndex: 10000,
    width: '900px',
    height: '400px'
    // 自定义样式
    // customStyle:'p{line-height: 1.4;margin: 1.12em 0;padding: 0;}',
    // 自定义外部样式
    // customLink:['http://localhost/customLink.css','http://xx.com/y2.css'],
};

var plugins = ('source-area' +
    ',code' +
    ',separator' +
    ',bold' +
    ',italic,' +
    'font-family,' +
    'font-size,' +
    'strike-through,' +
    'underline,' +
    'separator,' +
    'checkbox-source-area' +
    ',link' +
    ',fore-color' +
    ',back-color' +
    ',resize' +
    ',undo' +
    ',indent' +
    ',outdent' +
    ',unordered-list' +
    ',ordered-list' +
    ',element-path' +
    ',page-break' +
    ',preview' +
    ',maximize' +
    ',remove-format' +
    ',heading' +
    ',justify-left' +
    ',justify-center' +
    ',justify-right' +
    ',table' +
    ',smiley').split(',');

var fullPlugins = [];

util.each(plugins, function (p, i) {
    fullPlugins[i] = 'editor/plugin/' + p;
});

KISSY.use(fullPlugins, function (S) {
    var args = util.makeArray(arguments);
    args.shift();
    cfg.plugins = args;
    editor = new Editor(cfg);
    editor.render();
});

module.exports = function (fn) {
    if (editor) {
        fn(editor);
    } else {
        waitsFor(function () {
            return editor;
        }, 10000000);

        waits(1000);

        runs(function () {
            fn(editor);
        });
    }
};