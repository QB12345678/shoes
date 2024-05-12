/*!
* Lazy Load - jQuery plugin for lazy loading images
*
* Copyright (c) 2007-2015 Mika Tuupola
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
* Project home:
* http://www.appelsiini.net/projects/lazyload
*
* Version: 1.9.7
*
*/(function($,window,document,undefined){var $window=$(window);$.fn.lazyload=function(options){var elements=this;var $container;var settings={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:window,data_attribute:"original",skip_invisible:false,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};function update(){var counter=0;elements.each(function(){var $this=$(this);if(settings.skip_invisible&&!$this.is(":visible")){return;}
if($.abovethetop(this,settings)||$.leftofbegin(this,settings)){}else if(!$.belowthefold(this,settings)&&!$.rightoffold(this,settings)){$this.trigger("appear");counter=0;}else{if(++counter>settings.failure_limit){return false;}}});}
if(options){if(undefined!==options.failurelimit){options.failure_limit=options.failurelimit;delete options.failurelimit;}
if(undefined!==options.effectspeed){options.effect_speed=options.effectspeed;delete options.effectspeed;}
$.extend(settings,options);}
$container=(settings.container===undefined||settings.container===window)?$window:$(settings.container);if(0===settings.event.indexOf("scroll")){$container.bind(settings.event,function(){return update();});}
this.each(function(){var self=this;var $self=$(self);self.loaded=false;if($self.attr("src")===undefined||$self.attr("src")===false){if($self.is("img")){$self.attr("src",settings.placeholder);}}
$self.one("appear",function(){if(!this.loaded){if(settings.appear){var elements_left=elements.length;settings.appear.call(self,elements_left,settings);}
$("<img />").bind("load",function(){var original=$self.attr("data-"+settings.data_attribute);$self.hide();if($self.is("img")){$self.attr("src",original);}else{$self.css("background-image","url('"+original+"')");}
$self[settings.effect](settings.effect_speed);self.loaded=true;var temp=$.grep(elements,function(element){return!element.loaded;});elements=$(temp);if(settings.load){var elements_left=elements.length;settings.load.call(self,elements_left,settings);}}).attr("src",$self.attr("data-"+settings.data_attribute));}});if(0!==settings.event.indexOf("scroll")){$self.bind(settings.event,function(){if(!self.loaded){$self.trigger("appear");}});}});$window.bind("resize",function(){update();});if((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)){$window.bind("pageshow",function(event){if(event.originalEvent&&event.originalEvent.persisted){elements.each(function(){$(this).trigger("appear");});}});}
$(document).ready(function(){update();});return this;};$.belowthefold=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=(window.innerHeight?window.innerHeight:$window.height())+$window.scrollTop();}else{fold=$(settings.container).offset().top+$(settings.container).height();}
return fold<=$(element).offset().top-settings.threshold;};$.rightoffold=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=$window.width()+$window.scrollLeft();}else{fold=$(settings.container).offset().left+$(settings.container).width();}
return fold<=$(element).offset().left-settings.threshold;};$.abovethetop=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=$window.scrollTop();}else{fold=$(settings.container).offset().top;}
return fold>=$(element).offset().top+settings.threshold+$(element).height();};$.leftofbegin=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=$window.scrollLeft();}else{fold=$(settings.container).offset().left;}
return fold>=$(element).offset().left+settings.threshold+$(element).width();};$.inviewport=function(element,settings){return!$.rightoffold(element,settings)&&!$.leftofbegin(element,settings)&&!$.belowthefold(element,settings)&&!$.abovethetop(element,settings);};$.extend($.expr[":"],{"below-the-fold":function(a){return $.belowthefold(a,{threshold:0});},"above-the-top":function(a){return!$.belowthefold(a,{threshold:0});},"right-of-screen":function(a){return $.rightoffold(a,{threshold:0});},"left-of-screen":function(a){return!$.rightoffold(a,{threshold:0});},"in-viewport":function(a){return $.inviewport(a,{threshold:0});},"above-the-fold":function(a){return!$.belowthefold(a,{threshold:0});},"right-of-fold":function(a){return $.rightoffold(a,{threshold:0});},"left-of-fold":function(a){return!$.rightoffold(a,{threshold:0});}});})(jQuery,window,document);