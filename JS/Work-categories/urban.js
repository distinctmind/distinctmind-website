var allImages = [];

for (var i = 1; i < 48; i++) {
    if (i < 10) {
        allImages.push('<img src="../../Resources/Images/Work/urban/Save for web Full Res/0' + i + '.jpg"/>' );
    } else {
        allImages.push('<img src="../../Resources/Images/Work/urban/Save for web Full Res/' + i + '.jpg"/>' );
    }
}
    
for (var i = 1; i < 48; i++) {
    if (i < 10) {
        console.log(allImages[i-1])
        $(".Collage").append('<div class="wrapImage"><div class="image 0' + i + '"><div class="hoverDiv"></div>' + allImages[i-1] + '</div></div>');
    } else {
        $(".Collage").append('<div class="wrapImage"><div class="image ' + i + '"><div class="hoverDiv"></div>' + allImages[i-1] + '</div></div>')
    }
}


;(function(e){e.fn.collagePlus=function(t){function i(t,n,r,i){var o=r.padding*(t.length-1)+t.length*t[0][3],u=r.albumWidth-o,a=u/(n-o),f=o,l=n<r.albumWidth?true:false;for(var c=0;c<t.length;c++){var h=e(t[c][0]),p=Math.floor(t[c][1]*a),d=Math.floor(t[c][2]*a),v=!!(c<t.length-1);if(r.allowPartialLastRow===true&&l===true){p=t[c][1];d=t[c][2]}f+=p;if(!v&&f<r.albumWidth){if(r.allowPartialLastRow===true&&l===true){p=p}else{p=p+(r.albumWidth-f)}}var m=h.is("img")?h:h.find("img");m.width(p);if(!h.is("img")){h.width(p+t[c][3])}m.height(d);if(!h.is("img")){h.height(d+t[c][4])}s(h,v,r);m.load(function(e){return function(){if(r.effect=="default"){e.animate({opacity: 1},{duration:r.fadeSpeed})}else{if(r.direction=="vertical"){var t=i<=10?i:10}else{var t=c<=9?c+1:10}e.addClass(r.effect);e.addClass("effect-duration-"+t)}}}(h)).each(function(){if(this.complete)e(this).trigger("load")})}}function s(e,t,n){var r={"margin-bottom":n.padding+"px","margin-right":t?n.padding+"px":"0px",display:n.display,"vertical-align":"bottom",overflow:"hidden"};return e.css(r)}function o(t){$img=e(t);var n=new Array;n["w"]=parseFloat($img.css("border-left-width"))+parseFloat($img.css("border-right-width"));n["h"]=parseFloat($img.css("border-top-width"))+parseFloat($img.css("border-bottom-width"));return n}var n={targetHeight:400,albumWidth:this.width(),padding:parseFloat(this.css("padding-left")),images:this.children(),fadeSpeed:"fast",display:"inline-block",effect:"default",direction:"vertical",allowPartialLastRow:false};var r=e.extend({},n,t);return this.each(function(){var t=0,n=[],s=1;r.images.each(function(u){var a=e(this),f=a.is("img")?a:e(this).find("img");var l=typeof f.data("width")!="undefined"?f.data("width"):f.width(),c=typeof f.data("height")!="undefined"?f.data("height"):f.height();var h=o(f);f.data("width",l);f.data("height",c);var p=Math.ceil(l/c*r.targetHeight),d=Math.ceil(r.targetHeight);n.push([this,p,d,h["w"],h["h"]]);t+=p+h["w"]+r.padding;if(t>r.albumWidth&&n.length!=0){i(n,t-r.padding,r,s);delete t;delete n;t=0;n=[];s+=1}if(r.images.length-1==u&&n.length!=0){i(n,t,r,s);delete t;delete n;t=0;n=[];s+=1}})})}})(jQuery);


function hoverAllReady() {

    // ---- DROPDOWN ---- //

    // ** ----- DropDown Hover OUT ----- ** //
    $(".dropdown").hover(function(){
        
    }, function(){

        // Transitions to the dropdown items
        $(this).find("span").addClass("transe");
        $(this).find("a").addClass("transe");

        // Changing colors of dropdown items to reinforce the hover effect
        $(this).find("span").removeClass("makeSure");
        $(this).find("a.link").removeClass("makeSure");

        // Close the dropdown content
        $(this).find(".dropdown-content").css("display", "none");   
    })

    // ** ----- Hover IN ----- ** //
    $("#latest-work").hover(function(){

        // Changing colors of dropdown items to reinforce the hover effect
        $(this).parent().find("span").addClass("makeSure");
        $(this).parent().find("a.link").addClass("makeSure");

        // Activate dropdown menu!
        $(this).parent().find(".dropdown-content").css("display", "inline-block");

    }, function(){
        
    })

    // ---- See the rest of work Click Event + PROJECTS OVERLAY ---- //

    // Hover on Projects Title // 

    $("#projects-title").hover(function(){
        $(".Collage").animate({opacity: 0})
    }, function(){
         $(".Collage").animate({opacity: 1})
    });
    // ** ----- Click on the last h2 element "See rest of work" ----- ** //
    $("#projects-title").click(function(){

        // Pop up the projects overlay
        $('html').css('overflow-y','hidden');
        $(".projects-overlay").addClass("title-show");
        $(".projects-overlay").addClass("projects-open");
       
       // Go automatically to the urban section! 
        setTimeout(function(){
            $(".2").removeAttr("id");
            $(".projects-wrap").css("transform", "translate3d(-140%, 0px, 0px)");
            $(".2").next().attr("id", "current");         

        }, 800)
    });

    // White Border Bottom Number
    var currentNum = parseInt($("#current").attr("class").slice(0,2));

    // Click EVENT Numbers! 
    $(".number").click(function(){

        var num = parseInt($(this).attr("class").slice(0,2));
        var finalNum = (currentNum - num) * 140;

        // Moving the image! 
        $(".projects-wrap").css("transform", "translate3d(" + finalNum.toString() + "%, 0px, 0px)");
        $("#current").removeAttr("id");
        $(this).attr("id", "current");  
    });

    // Click EVENT Closing Button! 
    $(".close-btn.btn-2").click(function(){

        // Closing the projects overlay
        $('html').css('overflow-y','visible');
        $(".projects-overlay").removeClass("title-show");
        $(".projects-overlay").removeClass("projects-open");

        // Moving the image to the original place 
        setTimeout(function(){
            $(".projects-wrap").css("transform", "translate3d(0%, 0px, 0px)");
            $("#current").removeAttr("id");
            $(".2").attr("id", "current");  
        }, 400)
    });

}

hoverAllReady();


$(".image").hover(function(){
    $(this).addClass("rightNow");
    $(".hoverDiv").hover(function(){
    
    $(".rightNow").addClass("zoomIn");

}, function(){

    $(".rightNow").addClass("zoomOut");
    $(".rightNow").removeClass("zoomIn");

});
    
}, function(){
    $(this).removeClass("rightNow");
});


$(".hoverDiv").hover(function(){
    

    $(".rightNow").css("overflow", "hidden !important");
    $(".rightNow").addClass("zoomIn");

}, function(){

    $(".rightNow").addClass("zoomOut");
    $(".rightNow").removeClass("zoomIn");

});

var imageNumber = 47;


jQuery.fn.cleanWhitespace = function() {
    textNodes = this.contents().filter(
        function() { return (this.nodeType == 3 && !/\S/.test(this.nodeValue)); })
        .remove();
    return this;
}
    

    $(window).load(function () {
        $(".Collage img").css("opacity", "1.0");
        $('.Collage').cleanWhitespace().collagePlus({

            'effect': "default",

            'targetHeight': 750,

            'fadeSpeed': "fast", 

            'direction': 'vertical'

        });

        goWayPoint();

    });

function goWayPoint() {

    $("#projects-title").waypoint(function(direction){

            if (direction == "down") {
                console.log("hello")
                $("#projects-title").addClass("title-show");
            } else {
                $("#projects-title").removeClass("title-show");
            }

    },{offset: '90%'}); 
}

        



function collage() {

    $('.Collage').cleanWhitespace().collagePlus(
        {
            'effect': "default",

 			'targetHeight': 750,

 			'fadeSpeed': "slow"
        }
    );

    goWayPoint();
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

// ----- MODAL LOGIC ------- // bando

$(".image").click(function(){

    $('html').css('overflow-y','hidden');

    var yaya = $(this).attr("class").slice(6, 8);
    console.log(yaya);
    var theNumber = parseInt(yaya.slice(0,2));
    //Original Image that the user clicked
    $(".modal").css("background", 'url("../../Resources/Images/Work/urban/Save for web Full Res/' + yaya + ".jpg");
    $(".overlay").addClass("is-open");


    //----- RIGHT AND LEFT BUTTONS CLICKED ----- //

    // RIGHT BUTTON CLICKED ++
    $(".right-btn").click(function(){
        

        if (theNumber == imageNumber) {

                theNumber = 1;
                checkForInteractionPlus(theNumber);
            } else {

                theNumber++;
                checkForInteractionPlus(theNumber); 
            }


    });

    // LEFT BUTTON CLICKED --
    $(".left-btn").click(function(){

        if (theNumber == 1) {
                theNumber = imageNumber;
                checkForInteractionMinus(theNumber);
            } else {
                theNumber--;
                checkForInteractionMinus(theNumber);
            }


    });


    //----- KEYBOARD RIGHT AND LEFT PRESSED ----- //

    // RIGHT KEYBOARD PRESS ++
    $("html").bind('keydown', function(e) {
        
        if (e.keyCode == 39 || e.which == 39){

            if (theNumber == imageNumber) {
                theNumber = 1;
                checkForInteractionPlus(theNumber);
            } else {
                theNumber++;
                checkForInteractionPlus(theNumber); 
            }
    
            
                        
        
    }
    });

    // LEFT KEYBOARD PRESS --
    $("html").bind('keydown', function(e) {

        if (e.keyCode == 37 || e.which == 37){

            if (theNumber == 1) {
                theNumber = imageNumber;
                checkForInteractionMinus(theNumber);
            } else {
                theNumber--;
                checkForInteractionMinus(theNumber);
            }
    
            
            
                    
    }
    });


    
});

// CLOSE MODAL
$(".close-btn").click(function(){
    $('html').css('overflow-y','scroll');
    $(".modal").css("background", 'none');
    $(".overlay").removeClass("is-open");
});


// ----- FUNCTIONS FOR CHANGING IMAGES IN MODAL ----- //

function checkForInteractionPlus(number) {
    

    
        if (number > 9) {
            yaya = String(number);
        } else {
            yaya = "0" + String(number);
        }
            $(".modal").css("background", 'url("../../Resources/Images/Work/urban/Save for web Full Res/' + yaya + ".jpg");
        // } else {
            // number+=1;
            // yaya = "0" + String(number);
            // $(".modal").css("background", 'url("../Resources/Images/Latestwork/Minified/Minified-Resized/' + yaya + "-min.jpg");
        // }
        
    

}

function checkForInteractionMinus(number) {
    

    
        // if (number == 0) {
        //  yaya = "9";
        //  number == 9;
        if (number > 9) {
            yaya = String(number);
        } else {
            yaya = "0" + String(number);
        }
            $(".modal").css("background", 'url("../../Resources/Images/Work/urban/Save for web Full Res/' + yaya + ".jpg");
        // } else {
            // number-=1;
            // $(".modal").css("background", 'url("../Resources/Images/Latestwork/Minified/Minified-Resized/' + yaya + "-min.jpg");
        // }
        
    

}


$("#textLogo").on("click", function(){
    location.href = "../../landing.html";
    return false;
});

$("ul li a span").on("click", function(){
    location.href = "../../Main Page/main.html";
    return false;
});

$(".bando").on("click", function(){
    location.href = "../../Work/Categories/bando.html"
    return false;
});

$(".urban").on("click", function(){
    $('html').css('overflow-y','visible');
    $(".projects-overlay").removeClass("title-show");
    $(".projects-overlay").removeClass("projects-open");
});

