/*
Copyright 2012, KISSY UI Library v1.30dev
MIT Licensed
build time: Jun 10 21:07
*/
KISSY.add("editor/plugin/image/index",function(c,h,o,p,q,l){var i=c.UA,m=c.Node,f=c.all,n=c.Event,e=function(b){b=f(b);if("img"===b.nodeName()&&!/(^|\s+)ke_/.test(b[0].className))return b};return{init:function(b){function g(a){l.useDialog(b,"image",a)}b.addButton("image",{tooltip:"插入图片",listeners:{click:{fn:function(){g(null)}}},mode:h.WYSIWYG_MODE});var j=[{content:"图片属性",fn:function(){var a=e(this.get("editorSelectedEl"));a&&(this.hide(),g(f(a)))}},{content:"插入新行",fn:function(){this.hide();var a=
b.get("document")[0],d=new m(a.createElement("p"));i.ie||d._4e_appendBogus(void 0);a=new h.Range(a);a.setStartAfter(this.get("editorSelectedEl"));a.select();b.insertElement(d);a.moveToElementEditablePosition(d,1);a.select()}}],k=[];c.each(j,function(a){k.push({content:a.content})});b.addContextMenu("image",e,{width:120,children:k,listeners:{click:{fn:function(a){var b=this,e=a.target.get("content");c.each(j,function(a){a.content==e&&a.fn.call(b)})}}}});b.docReady(function(){n.on(b.get("document")[0],
"dblclick",function(a){a.halt();a=f(a.target);e(a)&&g(a)})});b.addBubble("image",e,{listeners:{afterRenderUI:{fn:function(){var a=this,d=a.get("contentEl");d.html('<a class="ks-editor-bubble-url" target="_blank" href="#">在新窗口查看</a>  |  <a class="ks-editor-bubble-link ks-editor-bubble-change" href="#">编辑</a>  |  <a class="ks-editor-bubble-link ks-editor-bubble-remove" href="#">删除</a>');var c=d.one(".ks-editor-bubble-url"),e=d.one(".ks-editor-bubble-change"),f=d.one(".ks-editor-bubble-remove");h.Utils.preventFocus(d);
e.on("click",function(b){g(a.get("editorSelectedEl"));b.halt()});f.on("click",function(d){if(i.webkit){var c=b.getSelection().getRanges();c&&c[0]&&(c[0].collapse(),c[0].select())}a.get("editorSelectedEl").remove();a.hide();b.notifySelectionChange();d.halt()});a.on("show",function(){var b=a.get("editorSelectedEl");b&&(b=b.attr("_ke_saved_src")||b.attr("src"),c.attr("href",b))})}}}})}}},{requires:["editor","../button/","../bubble/","../contextmenu/","../dialogLoader/"]});