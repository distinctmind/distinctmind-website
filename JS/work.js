 /*!
 *
 * jQuery collagePlus Plugin v0.3.2
 * https://github.com/ed-lea/jquery-collagePlus
 *
 * Copyright 2012, Ed Lea twitter.com/ed_lea
 *
 * built for http://qiip.me
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 *
 */

 $(".Collage img").css("opacity", "0");

function hoverAllReady() {


    $(".dropdown").hover(function(){
    var $el = $(this);
    setTimeout(function(){
        // $el.find("span").addClass("makeSure");
        // $el.find("a.link").addClass("makeSure");

    }, 500);
    
}, function(){
    $(this).find("span").addClass("transe")
    $(this).find("a").addClass("transe")

    $(this).find("span").removeClass("makeSure")
    $(this).find("a.link").removeClass("makeSure")
    $(this).find(".dropdown-content").css("display", "none");

    
})

$("#latest-work").hover(function(){
    
        $(this).parent().find("span").addClass("makeSure");
        $(this).parent().find("a.link").addClass("makeSure");
        $(this).parent().find(".dropdown-content").css("display", "inline-block");
}, function(){
    
})

}

hoverAllReady();

;(function(e){e.fn.collagePlus=function(t){function i(t,n,r,i){var o=r.padding*(t.length-1)+t.length*t[0][3],u=r.albumWidth-o,a=u/(n-o),f=o,l=n<r.albumWidth?true:false;for(var c=0;c<t.length;c++){var h=e(t[c][0]),p=Math.floor(t[c][1]*a),d=Math.floor(t[c][2]*a),v=!!(c<t.length-1);if(r.allowPartialLastRow===true&&l===true){p=t[c][1];d=t[c][2]}f+=p;if(!v&&f<r.albumWidth){if(r.allowPartialLastRow===true&&l===true){p=p}else{p=p+(r.albumWidth-f)}}var m=h.is("img")?h:h.find("img");m.width(p);if(!h.is("img")){h.width(p+t[c][3])}m.height(d);if(!h.is("img")){h.height(d+t[c][4])}s(h,v,r);m.load(function(e){return function(){if(r.effect=="default"){e.animate({opacity: 1},{duration:r.fadeSpeed})}else{if(r.direction=="vertical"){var t=i<=10?i:10}else{var t=c<=9?c+1:10}e.addClass(r.effect);e.addClass("effect-duration-"+t)}}}(h)).each(function(){if(this.complete)e(this).trigger("load")})}}function s(e,t,n){var r={"margin-bottom":n.padding+"px","margin-right":t?n.padding+"px":"0px",display:n.display,"vertical-align":"bottom",overflow:"hidden"};return e.css(r)}function o(t){$img=e(t);var n=new Array;n["w"]=parseFloat($img.css("border-left-width"))+parseFloat($img.css("border-right-width"));n["h"]=parseFloat($img.css("border-top-width"))+parseFloat($img.css("border-bottom-width"));return n}var n={targetHeight:400,albumWidth:this.width(),padding:parseFloat(this.css("padding-left")),images:this.children(),fadeSpeed:"fast",display:"inline-block",effect:"default",direction:"vertical",allowPartialLastRow:false};var r=e.extend({},n,t);return this.each(function(){var t=0,n=[],s=1;r.images.each(function(u){var a=e(this),f=a.is("img")?a:e(this).find("img");var l=typeof f.data("width")!="undefined"?f.data("width"):f.width(),c=typeof f.data("height")!="undefined"?f.data("height"):f.height();var h=o(f);f.data("width",l);f.data("height",c);var p=Math.ceil(l/c*r.targetHeight),d=Math.ceil(r.targetHeight);n.push([this,p,d,h["w"],h["h"]]);t+=p+h["w"]+r.padding;if(t>r.albumWidth&&n.length!=0){i(n,t-r.padding,r,s);delete t;delete n;t=0;n=[];s+=1}if(r.images.length-1==u&&n.length!=0){i(n,t,r,s);delete t;delete n;t=0;n=[];s+=1}})})}})(jQuery);

jQuery.fn.cleanWhitespace = function() {
    textNodes = this.contents().filter(
        function() { return (this.nodeType == 3 && !/\S/.test(this.nodeValue)); })
        .remove();
    return this;
}

$(window).load(function () {




       $('.Collage').cleanWhitespace().collagePlus({

            'effect': "default",

            'targetHeight': 750,

            'fadeSpeed': "slow"

        });

       setTimeout(function(){
        $(".Collage img").css("opacity", "0.6");
    }, 90);
 
    });

        

function collage() {

    $('.Collage').collagePlus(
        {
            'effect': "default",

 			'targetHeight': 600,

 			'fadeSpeed': "slow"
        }
    );
} 

var resizeTimer = null;
$(window).bind('resize', function() {
    // hide all the images until we resize them
    // set the element you are scaling i.e. the first child nodes of ```.Collage``` to opacity 0
    $('.Collage .wrapImage').css("opacity", 0);
    // set a timer to re-apply the plugin
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(collage, 200);
});
 

var totalWidth = $(".Collage").width();
var urbanWidth = totalWidth - $(".bando").width();
var hoverDiv = false;
var theNumberPlug = 0;

$(".image").hover(function(){

    $(this).addClass("rightNow");
	
	
}, function(){
	
	
	$(this).removeClass("rightNow");	
	
});



$(".hoverDiv").hover(function(){
	
	// var workCat = $(".rightNow").closest(".wrapImage").find("span.text").cleanWhitespace().text().slice(0,8);
    $(".rightNow span.text").animate({'opacity': '0'}, 200);
    $(".rightNow img").animate({'opacity': '1'}, 200);  

}, function() {

	$(".rightNow img").animate({'opacity': '0.6'}, 200);
    $(".rightNow span.text").animate({'opacity': '1'}, 200);

});


$(".image .bando").on("click", function(){
    location.href = "../Work/Categories/bando.html";
    return false;
});

$(".image.01 .hoverDiv").on("click", function(){
    location.href = "../Work/Categories/bando.html";
    return false;
});

$(".image .urban").on("click", function(){
    location.href = "../Work/Categories/urban.html";
    return false;
});

$(".image.02 .hoverDiv").on("click", function(){
    location.href = "../Work/Categories/urban.html";
    return false;
});

$("#textLogo").on("click", function(){
    location.href = "../landing.html";
    return false;
});

$("ul li a span").on("click", function(){
    location.href = "../Main Page/main.html";
    return false;
});










