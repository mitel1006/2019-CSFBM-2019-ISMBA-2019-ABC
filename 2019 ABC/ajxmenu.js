// Ajatix Advanced CSS Drop Down Menu
// Copyright (C) 2009-2014 Ajatix. All rights reserved.
// http://www.ajatix.com
(function(){var d=document,de=d.documentElement,menu,userAgent=navigator.userAgent.toLowerCase(),opera=/opera/.test(userAgent),hasTouch=("ontouchstart" in window||window.navigator.msMaxTouchPoints),mul,clickMode=false,active=new Array();function onLoad(){var name="AJXCSSMenuWeOfEYB";var divs=d.getElementsByTagName("div");for(var i=0;i<divs.length;i++){if(divs[i].className==name){menu=divs[i];var uls=menu.getElementsByTagName("ul");mul=uls[0];var lis=menu.getElementsByTagName("li");for(var n=lis[0];n;n=n.nextSibling)if(n.tagName=="LI"){n.ajxtop=true;if(opera)n.style.width=n.offsetWidth-(n.className.indexOf("tlast")==-1? 0:0);}for(var j=0;j<lis.length;j++){var li=lis[j];var aa=li.getElementsByTagName("a");if(aa.length>0){li.className=li.className;li.style.position="static";var subs=li.getElementsByTagName("ul");if(subs.length>0)subs[0].style.display="none";li.shown=li.show=false;if(hasTouch){li.onmspointerdown=li.ontouchstart=function(e){e.stopPropagation();if(handleClick(this))return false;}}li.onmouseover=function(){if(clickMode)return;activate(this);};li.onmouseout=function(){if(clickMode)return;deactivate(this);};li.onclick=function(e){if(clickMode){e.stopPropagation();if(handleClick(this))return false;mul.show=false;mul.style.height=0;mul.className="";}deactivateAll();}}}menu.ontouchstart=menu.onclick=function(e){if(!clickMode)return;mul.show=!mul.show;if(mul.show){mul.style.height="auto";mul.className="ajxover";}else{deactivateAll();mul.style.height=0;mul.className="";}return false;}}}if(window.addEventListener)window.addEventListener('resize',setClickMode,false);setClickMode();if(hasTouch)d.addEventListener('touchstart', function(){deactivateAll()}, false);}function setClickMode(){var newClickMode=false;if(window.innerWidth&&window.innerWidth<=480)newClickMode=true;if(newClickMode!=clickMode){mul.show=false;mul.className="";deactivateAll();if(newClickMode){mul.style.height=0;}else{mul.style.height="auto";}}clickMode=newClickMode;}function handleClick(o){var subs=o.getElementsByTagName("ul");if(subs.length>0&&!o.show){var parents=new Array();var p=o;while(p!=menu){p=p.offsetParent;if(p.tagName=="LI")parents.push(p);}for(var i=active.length-1;i>=0;i--){var d=1;for(var j=0;j<parents.length;j++){if(parents[j]==active[i])d=0;}if(d){deactivate(active[i]);active.splice(i,1);}}active.push(o);activate(o);return true;}return false;}function activate(o){clearTimeout(menu.timer);if(o.className.indexOf("ajxover")==-1)o.className+=" ajxover";o.show=true;if(menu.clickMode)update();else menu.timer=setTimeout(update, 150);}function deactivate(o){clearTimeout(menu.timer);if(!o.shown)o.className=o.className.replace(new RegExp(" ?ajxover\\b"), "");o.show=false;if(menu.clickMode)update();else menu.timer=setTimeout(update, 400);}function deactivateAll(){for(var i=0;i<active.length;i++){deactivate(active[i]);}active.length=0;update();}function update(){var lis=menu.getElementsByTagName("li");for(var i=lis.length-1;i>=0;i--){var li=lis[i];if(li.show){if(!li.shown){var subs=li.getElementsByTagName("ul");if(subs.length>0){var sub=subs[0];li.style.position="relative";sub.style.clip="rect(0,0,0,0)";sub.style.display="block";if(typeof(sub.oleft)=="undefined")sub.oleft=parseInt(sub.currentStyle? sub.currentStyle["left"]:window.getComputedStyle(sub, "")["left"]);sub.style.left=sub.oleft+"px";var rec=sub.getBoundingClientRect();var overflow=rec.right-getViewWidth();if(overflow>0){var aleft=li.getBoundingClientRect().width-sub.oleft-rec.width;var aoverflow=-(li.getBoundingClientRect().left+aleft);if(overflow>rec.width/2&&overflow>aoverflow){sub.style.left=aleft+(aoverflow>0?aoverflow:0)+"px";}else{sub.style.left=sub.offsetLeft-overflow+"px";}}slide(sub,li.ajxtop);li.shown=true;}}}else{var subs=li.getElementsByTagName("ul");if(subs.length>0){subs[0].style.display="none";li.style.position="static";li.shown=false;if(li.className.indexOf("ajxover")!=-1)li.className=li.className.replace(new RegExp(" ?ajxover\\b"), "");}}}}function getViewWidth(){return!window.innerWidth||innerWidth<=screen.width ?de.clientWidth:de.scrollWidth*de.clientWidth/outerWidth;}function slide(o,d){var h=o.offsetHeight;var w=o.offsetWidth;var c=d? h:w;var t=parseInt(o.currentStyle? o.currentStyle[d?"top":"left"]:window.getComputedStyle(o, "")[d?"top":"left"]);o.tstart=new Date;if(!o.timer)o.timer=setInterval(function(){var s=(new Date-o.tstart)/400;if(s<1){var v=c*(s<0.5? s*s*s*4:1+(--s)*s*s*4);o.style[d?"top":"left"]=v-c+t+"px";o.style.clip="rect("+(d?c-v+"px":"0")+","+w+"px,"+h+"px,"+(d?"0":c-v+"px")+")";}else{clearInterval(o.timer);o.timer=undefined;o.style[d?"top":"left"]=t+"px";try{o.style.clip="inherit";}catch(E){o.style.clip="rect(auto,auto,auto,auto)";}}}, 13);}function addOnReady(f,fu){var isReady=false;function ready(){if(!isReady){isReady=true;f();};}if(d.addEventListener){d.addEventListener('DOMContentLoaded',ready,false);window.addEventListener("load",ready,false);window.addEventListener("unload",fu,false);}if(window.attachEvent)window.attachEvent("onload",ready);if(de.doScroll&&window==top){(function(){if(!isReady){try{de.doScroll("left");}catch(E){setTimeout(arguments.callee,0);return;}ready();}})()}}addOnReady(onLoad, onLoad);})();