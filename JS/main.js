
// IF USER CLICKS ON LOGO 
// ------ Go to HomePage (SlideShow) ------ //
$("#textLogo").on("click", function(){
	location.href = "../landing.html";
});


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}



// $(".dropdown").hover(function(){
	
// }, function(){
// 	$("#myDropdown").removeClass("show");
// })

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




var allDivsHeight = $(".first").height();

// $(".my-row").css("min-height", "1px");
// $(".my-row").css("max-height", allDivsHeight);
// $(".wrapItAroundMan").css("max-height", allDivsHeight.toString())
// $(".rest").css("height", allDivsHeight.toString())
// $(".portrait").css("height", theFinalString);
// $(".portrait").css("height", "213px");
// $(".portrait").attr('style', 'max-height:' + allDivsHeightString +  '!important');



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

// ----- IF USER WANTS TO GO TO PORTRAITS SECTION  ------- // 


// ----- HOVER - ACTIVATE ICON  ------- // 
$(".hover-to-portraits").hover(function(){

	$(".first-section-wrap").css("margin-right", "40px");
	$(".hover-to-portraits").css("left", "95%");
	$("i").css("opacity", "1");

}, function(){

	$(".first-section-wrap").css("margin-right", "0px");
	$(".hover-to-portraits").css("left", "98%");
	$(".ion-navicon").css("opacity", "0");
});

// ----- FUNCTION TO GO TO PORTRAITS SECTION  ------- // 



// ----- MODAL LOGIC ------- // 

$(".image").click(function(){

	$('html').css('overflow-y','hidden');

	var yaya = $(this).attr("class").slice(10, 12);
	var theNumber = parseInt(yaya.slice(0,2));
	//Original Image that the user clicked
	$(".modal").css("background", 'url("../Resources/Images/Latestwork/Minified/Minified-v2/' + yaya + "-min.jpg");
	$(".overlay").addClass("is-open");


	//----- RIGHT AND LEFT BUTTONS CLICKED ----- //

	// RIGHT BUTTON CLICKED ++
	$(".right-btn").click(function(){
		

		if (theNumber == 12) {

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
				theNumber = 12;
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

			if (theNumber == 12) {
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
				theNumber = 12;
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
			$(".modal").css("background", 'url("../Resources/Images/Latestwork/Minified/Minified-v2/' + yaya + "-min.jpg");
		
		// } else {
			// number+=1;
			// yaya = "0" + String(number);
			// $(".modal").css("background", 'url("../Resources/Images/Latestwork/Minified/Minified-Resized/' + yaya + "-min.jpg");
		// }
		
	

}

function checkForInteractionMinus(number) {
	

	
		// if (number == 0) {
		// 	yaya = "9";
		// 	number == 9;
		if (number > 9) {
			yaya = String(number);
		} else {
			yaya = "0" + String(number);
		}
			
			$(".modal").css("background", 'url("../Resources/Images/Latestwork/Minified/Minified-v2/' + yaya + "-min.jpg");
		// } else {
			// number-=1;
			// $(".modal").css("background", 'url("../Resources/Images/Latestwork/Minified/Minified-Resized/' + yaya + "-min.jpg");
		// }
		
	

}



