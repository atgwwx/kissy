/*
Copyright 2013, KISSY v1.40dev
MIT Licensed
build time: Oct 21 19:41
*/
KISSY.add("scroll-view/base/render",function(d,k,m,n){var d=d.Features,l,k={syncUI:function(){var e=this.control,g=e.el,h=e.contentEl,d=e.$contentEl,i=h.offsetHeight,h=h.offsetWidth,f=g.clientHeight,a=g.clientWidth;e.scrollHeight=i;e.scrollWidth=h;e.clientHeight=f;e.clientWidth=a;g=e.allowScroll={};i>f&&(g.top=1);h>a&&(g.left=1);e.minScroll={left:0,top:0};var b,c;e.maxScroll={left:b=h-a,top:c=i-f};delete e.scrollStep;f=e.get("snap");i=e.get("scrollLeft");h=e.get("scrollTop");if(f){var j=d.offset(),
d=e.pages="string"==typeof f?d.all(f):d.children(),f=e.get("pageIndex"),q=e.pagesOffset=[];d.each(function(a,e){var f=a.offset(),d=f.left-j.left,f=f.top-j.top;d<=b&&f<=c&&(q[e]={left:d,top:f,index:e})});if(f){e.scrollToPage(f);return}}e.scrollToWithBounds({left:i,top:h})},_onSetScrollLeft:function(e){this.control.contentEl.style.left=-e+"px"},_onSetScrollTop:function(e){this.control.contentEl.style.top=-e+"px"}};d.isTransformSupported()&&(l=d.getTransformProperty(),k._onSetScrollLeft=function(e){var d=
this.control;d.contentEl.style[l]="translate3d("+-e+"px,"+-d.get("scrollTop")+"px,0)"},k._onSetScrollTop=function(e){var d=this.control;d.contentEl.style[l]="translate3d("+-d.get("scrollLeft")+"px,"+-e+"px,0)"});return m.getDefaultRender().extend([n],k,{name:"ScrollViewRender"})},{requires:["node","component/container","component/extension/content-render"]});
KISSY.add("scroll-view/base",function(d,k,m,n,l,e){function g(){var a=this.el,b=a.scrollTop,c=a.scrollLeft;b&&this.set("scrollTop",b+this.get("scrollTop"));c&&this.set("scrollLeft",c+this.get("scrollLeft"));a.scrollTop=a.scrollLeft=0}function h(a,b){a.scrollView.set(b.prop,b.val)}var o=d.all,i=d.Features.isTouchEventSupported(),f=k.KeyCode;return n.extend({initializer:function(){this.scrollAnims=[]},bindUI:function(){this.$el.on("mousewheel",this.handleMouseWheel,this).on("scroll",g,this)},handleKeyDownInternal:function(a){var b=
o(a.target),c=b.nodeName();if("input"==c||"textarea"==c||"select"==c||b.hasAttr("contenteditable"))return e;var a=a.keyCode,c=this.getScrollStep(),b=e,j=this.allowScroll.left;if(this.allowScroll.top){var d=c.top,p=this.clientHeight,h=this.get("scrollTop");a==f.DOWN?(this.scrollToWithBounds({top:h+d}),b=!0):a==f.UP?(this.scrollToWithBounds({top:h-d}),b=!0):a==f.PAGE_DOWN?(this.scrollToWithBounds({top:h+p}),b=!0):a==f.PAGE_UP&&(this.scrollToWithBounds({top:h-p}),b=!0)}j&&(c=c.left,j=this.get("scrollLeft"),
a==f.RIGHT?(this.scrollToWithBounds({left:j+c}),b=!0):a==f.LEFT&&(this.scrollToWithBounds({left:j-c}),b=!0));return b},getScrollStep:function(){if(this.scrollStep)return this.scrollStep;var a=o(this.get("el")[0].ownerDocument),b=this.clientHeight,c=this.clientWidth;return this.scrollStep={top:Math.max(0.7*b*b/a.height(),20),left:Math.max(0.7*c*c/a.width(),20)}},handleMouseWheel:function(a){if(!this.get("disabled")){var b,c,e=this.getScrollStep(),d,f=this.maxScroll,h=this.minScroll;if((d=a.deltaY)&&
this.allowScroll.top){var g=this.get("scrollTop");b=f.top;c=h.top;g<=c&&0<d||g>=b&&0>d||(this.scrollToWithBounds({top:g-a.deltaY*e.top}),a.preventDefault())}if((d=a.deltaX)&&this.allowScroll.left)g=this.get("scrollLeft"),b=f.left,c=h.left,g<=c&&0<d||g>=b&&0>d||(this.scrollToWithBounds({left:g-a.deltaX*e.left}),a.preventDefault())}},isAxisEnabled:function(a){return this.allowScroll["x"==a?"left":"top"]},stopAnimation:function(){this.scrollAnims.length&&(d.each(this.scrollAnims,function(a){a.stop()}),
this.scrollAnims=[]);this.scrollToWithBounds({left:this.get("scrollLeft"),top:this.get("scrollTop")})},_uiSetPageIndex:function(a){this.scrollToPage(a)},_getPageIndexFromXY:function(a,b,c){var d=this.pagesOffset.concat([]),f=b?"left":"top";d.sort(function(a,b){return a[f]-b[f]});if(0<c)for(b=0;b<d.length;b++){if(c=d[b],c[f]>=a)return c.index}else for(b=d.length-1;0<=b;b--)if(c=d[b],c[f]<=a)return c.index;return e},scrollToPage:function(a,b){var c;if((c=this.pagesOffset)&&c[a])this.set("pageIndex",
a),this.scrollTo(c[a],b)},scrollToWithBounds:function(a,b){var c=this.maxScroll,e=this.minScroll;a.left&&(a.left=Math.min(Math.max(a.left,e.left),c.left));a.top&&(a.top=Math.min(Math.max(a.top,e.top),c.top));this.scrollTo(a,b)},scrollTo:function(a,b){var c=a.left,d=a.top;if(b){this.get("scrollLeft");this.get("scrollTop");var f={},g={};c!==e&&(g.scrollLeft=c,f.scrollLeft=this.get("scrollLeft"));d!==e&&(g.scrollTop=d,f.scrollTop=this.get("scrollTop"));b.frame=h;b.node=f;b.to=g;this.scrollAnims.push(c=
new m(b));c.scrollView=this;c.run()}else c!==e&&this.set("scrollLeft",c),d!==e&&this.set("scrollTop",d)}},{ATTRS:{contentEl:{},scrollLeft:{view:1,value:0},scrollTop:{view:1,value:0},focusable:{value:!i},allowTextSelection:{value:!0},handleMouseEvents:{value:!1},snap:{value:!1},snapDuration:{value:0.3},snapEasing:{value:"easeOut"},pageIndex:{value:0},xrender:{value:l}},xclass:"scroll-view"})},{requires:["node","anim","component/container","./base/render"]});