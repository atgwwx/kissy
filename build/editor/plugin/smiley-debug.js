/*
Copyright 2014, KISSY v5.0.0
MIT Licensed
build time: Jul 1 23:04
*/
/*
combined modules:
editor/plugin/smiley
*/
KISSY.add('editor/plugin/smiley', [
    'editor',
    './overlay',
    './button',
    'node',
    'util'
], function (S, require, exports, module) {
    /**
 * @ignore
 * smiley button
 * @author yiminghe@gmail.com
 */
    var Editor = require('editor');
    var Overlay4E = require('./overlay');
    require('./button');
    var $ = require('node');
    var util = require('util');
    var smileyMarkup = '<div class="{prefixCls}editor-smiley-sprite">';
    for (var i = 0; i <= 98; i++) {
        smileyMarkup += '<a href="javascript:void(0)" ' + 'data-icon="http://a.tbcdn.cn/sys/wangwang/smiley/48x48/' + i + '.gif">' + '</a>';
    }
    smileyMarkup += '</div>';
    function Smiley() {
    }
    Smiley.prototype = {
        pluginRenderUI: function (editor) {
            var prefixCls = editor.get('prefixCls');
            editor.addButton('smiley', {
                tooltip: '\u63D2\u5165\u8868\u60C5',
                checkable: true,
                listeners: {
                    afterSyncUI: function () {
                        var self = this;
                        self.on('blur', function () {
                            // make click event fire
                            setTimeout(function () {
                                if (self.smiley) {
                                    self.smiley.hide();
                                }
                            }, 150);
                        });
                    },
                    click: function () {
                        var self = this, smiley, checked = self.get('checked');
                        if (checked) {
                            if (!(smiley = self.smiley)) {
                                smiley = self.smiley = new Overlay4E({
                                    content: util.substitute(smileyMarkup, { prefixCls: prefixCls }),
                                    focus4e: false,
                                    width: 300,
                                    elCls: prefixCls + 'editor-popup',
                                    zIndex: Editor.baseZIndex(Editor.ZIndexManager.POPUP_MENU),
                                    mask: false
                                }).render();
                                smiley.get('el').on('click', function (ev) {
                                    var t = $(ev.target), icon;
                                    if (t.nodeName() === 'a' && (icon = t.attr('data-icon'))) {
                                        var img = $('<img ' + 'alt="" src="' + icon + '"/>', editor.get('document')[0]);
                                        editor.insertElement(img);
                                    }
                                });
                                smiley.on('hide', function () {
                                    self.set('checked', false);
                                });
                            }
                            smiley.set('align', {
                                node: this.get('el'),
                                points: [
                                    'bl',
                                    'tl'
                                ],
                                overflow: {
                                    adjustX: 1,
                                    adjustY: 1
                                }
                            });
                            smiley.show();
                        } else {
                            if (self.smiley) {
                                self.smiley.hide();
                            }
                        }
                    },
                    destroy: function () {
                        if (this.smiley) {
                            this.smiley.destroy();
                        }
                    }
                },
                mode: Editor.Mode.WYSIWYG_MODE
            });
        }
    };
    module.exports = Smiley;
});




