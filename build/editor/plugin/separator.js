/*
Copyright 2014, KISSY v5.0.0
MIT Licensed
build time: Jul 1 23:04
*/
KISSY.add("editor/plugin/separator",["node"],function(e,b,f,c){function a(){}var d=b("node");a.prototype={pluginRenderUI:function(a){d('<span class="'+a.get("prefixCls")+'editor-toolbar-separator">&nbsp;</span>').appendTo(a.get("toolBarEl"))}};c.exports=a});
