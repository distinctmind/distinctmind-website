function setContainerHeight(amount) {

	var selectedDivs = $(".selected");
	var totalHeight = 0;

	for (var i = 0; i < selectedDivs.length/amount; i++) {
		totalHeight += selectedDivs[i].clientHeight + 30;
	}
	$(".container").css("height", String(totalHeight) + "px");
}


function setLeft() {

	
	var selectedDivs = $(".selected");
	var selectedDivsImg = selectedDivs.children();
	var imageWidth = selectedDivsImg[0].clientWidth;
	var windowWidth = document.documentElement.clientWidth;
	
	var leftAmount = 0;
	var topAmount = 0;
	var largestHeight = 0;
	var rowHeight = 0;


	if (windowWidth >= 1200) {

		for (var i = 0; i < selectedDivs.length; i++) {
			
			if (selectedDivsImg[i].hasAttribute('data-type')) {

				if (selectedDivsImg[i].getAttribute('data-type') == 'portrait') {
					largestHeight = selectedDivs[i].clientHeight;
					//rowHeight += largestHeight;
				}
			}

			leftAmount = (windowWidth-(imageWidth*3+40))/2 + (i % 3)*(imageWidth + 20);
			//topAmount = (Math.floor(i/3)*(rowHeight+50));

			selectedDivs[i].style.top = String(rowHeight) + "px";
			
			if ((i+1)%3 == 0 || selectedDivs[i].getAttribute('id') == 'about' || i+1== selectedDivs.length) {
				rowHeight +=  selectedDivsImg[i].clientHeight + 30;
			}
			selectedDivs[i].style.left = String(leftAmount) + "px";

		}

		$("#logo").css("margin-left", String( (windowWidth-(imageWidth*3+40))/2 + "px"));
		
	} else if (windowWidth > 750 && windowWidth < 1200) {

		var portraitBlock = false;

		for (var i = 0; i < selectedDivs.length; i++) {

			largestHeight = Math.max(selectedDivs[i].clientHeight, largestHeight);
			leftAmount = (windowWidth-(imageWidth*2+20))/2 + (i % 2)*(imageWidth + 20);


			if (portraitBlock == true) {
				leftAmount = (windowWidth-(imageWidth*2+20))/2 + ( (i+1) % 2 )*(imageWidth + 20);
			}

			if (selectedDivsImg[i].hasAttribute('data-type')) {
				
				if (selectedDivsImg[i].getAttribute('data-type') == 'portrait') {
					
					largestHeight = selectedDivs[i].clientHeight;

					if (selectedDivs[i].classList.contains('thirdPortrait')) {
						largestHeight = 0;
					}
				}
			}

			selectedDivs[i].style.left = String(leftAmount) + "px";
			selectedDivs[i].style.top = String(rowHeight) + "px";

			if ( ((i+1)%2 == 0 && !portraitBlock) || ( (portraitBlock && i%2==0) || (portraitBlock && (selectedDivs.length%2==0))) ) {
				rowHeight += largestHeight + 30;
				largestHeight = 0;
			}

			if (i >= 1 && selectedDivs[i-1]) {

				if (selectedDivs[i-1].classList.contains('thirdPortrait')) {
					portraitBlock = true;
				}
			}
		}

		$("#logo").css("margin-left", String((windowWidth-imageWidth*2-20)/2 + "px"));
		
	
	} else if (windowWidth <= 750) {

		for (var i = 0; i < selectedDivs.length; i++) {

			if (selectedDivsImg[i].hasAttribute('data-type')) {
				if (selectedDivsImg[i].getAttribute('data-type') == 'portrait') {
					largestHeight = selectedDivs[i].clientHeight;
				}
			}
			topAmount = i && rowHeight;
			rowHeight +=  selectedDivs[i].clientHeight + 30;

			selectedDivs[i].style.top = String(topAmount) + "px";
			selectedDivs[i].style.left = String((windowWidth-(imageWidth))/2) + "px";
		}

		$("#logo").css("margin-left", String((windowWidth-imageWidth)/2 + "px"));
	
	}
	$(".container").css("height", String(rowHeight) + "px");
}

/* Used to continually adjust the fixed height of each div upon window resize */
/* Note this doesn't change the size of the first div because every other div's height is based on the first one. */

function adjustHeight(filter, index) {
	
	var selectedDivs = $(".selected");
	var selectedDivsImg = selectedDivs.children();

	var firstImage = selectedDivsImg[0];
	var firstPortrait = $(".firstPortrait img")[index];
	
	var currentPortraitHeight = 0;
	var currentLandscapeHeight = firstImage.clientHeight;	
	var currentWindowWidth = document.documentElement.clientWidth;

	if (firstPortrait) {
		currentPortraitHeight = firstPortrait.clientHeight;
	}

	//Make sure the first image div can be displayed
	if (selectedDivsImg[0].getAttribute('class') == 'me') {		
		//$(".me").parent()[0].style.left = String((document.documentElement.clientWidth-($("#aboutDiv").width()+20)))/2+"px";
		$("#logo").css("margin-left", String( (currentWindowWidth-(firstImage.clientWidth))/2 + "px"));
		$(".navBar").css("right", String((currentWindowWidth-(firstImage.clientWidth))/2 + "px"));
		$("#burger").css("right", String((currentWindowWidth-(firstImage.clientWidth))/2 + "px"));
		$("#aboutDiv").css("margin-left", String( (currentWindowWidth - $("#aboutDiv").width())/2) + "px");
		setContainerHeight(1);
	} else {
		
		//Go through all selected elements
		for (var i = 0; i < selectedDivs.length; i++) {
			
			//Portrait Image or Video Image
			if (selectedDivsImg[i].hasAttribute('data-type')) {
				
				//Portrait
				if (selectedDivsImg[i].getAttribute('data-type') == 'portrait') {
					if (selectedDivs[i].classList.contains('firstPortrait')) {
  					} else {							
						selectedDivs[i].style.height = String(currentPortraitHeight) + "px";
						selectedDivs[i].style.display =  "block";
					}			
				//Video - treat as landscape
				} else {
					selectedDivs[i].style.height = String(currentLandscapeHeight) + "px";
					selectedDivs[i].style.display =  "block";
				}		
				
			//Landscape
			} else {
				selectedDivs[i].style.height = String(currentLandscapeHeight) + "px";
				selectedDivs[i].style.display =  "block";
			}
		}
		
		//**** ALL of the above can be done with these three lines of code: ****
		//$(".container .landscape").css('height', currentLandscapeHeight);
		//$(".container .videos").css('height', currentLandscapeHeight);
		//$(".container .portrait").css('height', $("#firstPortrait img").height());
		var theWindow = document.documentElement.clientWidth;

		if (filter == "twoCol") {

			if (theWindow <= 1050) {

				$("#logo").css("margin-left", String( (theWindow-(firstImage.clientWidth))/2 + "px"));
				$(".first").css("margin-left", String( (theWindow - $(".first").width())/2) + "px");
				$(".navBar").css("right", String( (theWindow-(firstImage.clientWidth))/2) + "px");
				$("#burger").css("right", String((theWindow-(firstImage.clientWidth))/2) + "px");
				setContainerHeight(1);
				
			} else {
				$("#logo").css("margin-left", String( (theWindow-firstImage.clientWidth*2-20)/2) + "px");
				$(".first").css("margin-left", String( (theWindow - $(".first").width()*2-20)/2) + "px");
				$(".navBar").css("right", String( (theWindow-(firstImage.clientWidth*2+20))/2) + "px");
				$("#burger").css("right", String((theWindow-(firstImage.clientWidth*2+20))/2) + "px");
				setContainerHeight(2);
			} 
			
		} else {

			if (theWindow >= 1200) {
				$(".navBar").css("right", String((theWindow-(firstImage.clientWidth*3+40))/2 + "px"));
			} else if (theWindow > 750 && theWindow < 1200) {
				
				if ($(".thirdPortrait")[index]) {

					var portraitHeight = (currentLandscapeHeight*2) + 30;
					$(".thirdPortrait")[index].style.height = String(portraitHeight) + "px";
					
					if (selectedDivs.length%2==0) {
						selectedDivs[selectedDivs.length-1].style.height = "auto";
						selectedDivs[selectedDivs.length-1].style.width = String(theWindow- (theWindow - 2*firstImage.clientWidth - 20)) + "px";
					}
				}
				
				$("#burger").css("right", String((theWindow-(firstImage.clientWidth*2+20))/2 + "px"));
				$(".navBar").css("right", String((theWindow-(firstImage.clientWidth*2+20))/2 + "px"));
			} else {
				selectedDivs[selectedDivs.length-1].style.width = "93%";
				$("#burger").css("right", String( (theWindow-(firstImage.clientWidth))/2 + "px"));
				$(".navBar").css("right", String( (theWindow-(firstImage.clientWidth))/2 + "px"));
			}
			setLeft();
		}


	}
}

function closeModal(mode) {
	
	$(".modal" + "." + mode).hide();
	$(".modal" + "." + mode).css('display', 'none');
	$("#burger").css("z-index", "100");
	if (mode == "picture") {
		$(".modalPicture").css('display', 'none');
		$(".modal.picture").hide();
		$(".modal.picture").css('display', 'none');
	} else if (mode == "video") {
		$(".modalVideo").css('display', 'none');
	}
	$("html").removeClass('lock');
}

function showNav() {

	var windowWidth = document.documentElement.clientWidth;

	if (windowWidth <= 917) {
		$("header").addClass("fixedNav");
		$(".container").css("top", "100px");
		$(".modal.menu").css("opacity", "1");
		$("header .navBar").fadeOut(300);
		$("#burger").css("display", "block");
		
	} else {
		$("header").removeClass("fixedNav");
		$(".modal.menu").css("opacity", "0");
		$("header .navBar").fadeIn(300);
		//$("#burger").removeClass("open");
		$("#burger").hide();
		
	}
}

var biggerImages = [ 

		'../Images/work/medium/01.jpg',
		'../Images/work/medium/02.jpg',
		'../Images/work/medium/03.jpg',
		'../Images/work/medium/04.jpg',
		'../Images/work/medium/05.jpg',
		'../Images/work/medium/06.jpg'
]

var videoTitle = {

	0: "Korea Trip 2016",
	1: "High's and low's of Toronto",
	2: "Enter the world of Thailand",
	3: "Beijing Trip"

}

var videoSource = {

	0: "https://player.vimeo.com/video/131379686",
	1: "https://www.youtube.com/embed/o0IH57Xo2e8",
	2: "https://www.youtube.com/embed/fySHhoATxp8",
	3: "https://player.vimeo.com/video/159087334"

}

function showModal(mode) {


	if (mode == "picture") {
		$(".modal.picture").show();
		$(".modalPicture").css('display', 'block');
	} else if (mode == "video") {
		$(".modalVideo").css('display', 'block');
	} else if (mode == "about") {
		$(".modalAbout").css('display', 'block');
	} else {
		$("#burger").css("z-index", "120");
		var newFilter = ".modal." + mode;
		$(newFilter).css("display", "block");
	}
	$("html").addClass('lock');
	
}

function changePictures() {

	$(".container div img").each(function(i) {
		$(this).attr('src', biggerImages[i]);
	});

}
function loadImage(image) {
	var loadImage = new Image();
	loadImage.onload = function(){
		image.src = image.getAttribute('data-src');
	}
	loadImage.src = image.getAttribute('data-src');
}

function showPictures(theFilter) {

	var images = $(theFilter);
	
	for (var i = 1; i < images.length; i++) {
		loadImage(images[i]);
	}
	if (theFilter == ".image-div.faces img") {
		$(".firstPortrait")[1].style.opacity = "1.0";
	} else if (theFilter == ".image-div.street img") {
		$(".firstPortrait")[0].style.opacity = "1.0";
	}
	$("#firstImage").parent().css("opacity", "1.0");
}

function changeView(type,filter,index) {

	console.log("FILTER IS: " + String(filter));
	console.log("TYPE IS: " + String(type));
	$(".default").removeClass("not");
	$('.default').removeClass('default');
	$(".navBar li #" + String(type)).children().children().addClass('default');
	$("#burger").removeClass("open");
	$("#firstImage").removeAttr("id");
	var mask = $("#filter-mask");
	mask.addClass("filter-mask");

	var newSelector = ".image-div." + filter;
	var firstParent = $(newSelector).first();
	var firstChild = firstParent.children();
	
	setTimeout(function(){

		firstChild[0].setAttribute("id", "firstImage");
		
		$(".image-div").removeClass("selected");
		$(".image-div").css("display", "none");
		$(newSelector).addClass("selected");
		$(newSelector)[0].setAttribute('data-index', index);
		$(newSelector)[0].dataset.index = index;
		
		//OLD
		firstParent.css("opacity", "0");
		firstParent.css("display", "block");

		firstChild[0].src = firstChild[0].getAttribute('data-src');
		
		var loadImage = new Image();
 		loadImage.src = firstChild[0].src;

  		loadImage.onload = function(){

  			//If there is a portrait image also make sure image is loaded before calling adjust height
  			if (typeof index != "undefined") {

				$(".firstPortrait")[index].style.display = "block";
				$(".firstPortrait img")[index].src = $(".firstPortrait img")[index].getAttribute('data-src');
				//$(".firstPortrait img")[0].src = $("#firstPortrait img")[0].getAttribute('data-src');

				var loadPortrait = new Image();
				loadPortrait.src = $(".firstPortrait img")[index].src;

				loadPortrait.onload = function() {
					adjustHeight(filter, index);
				}

			} else {
				adjustHeight(filter, index);
			}
			showPictures(newSelector + " img");
			$(".filter-mask").removeClass("filter-mask");
			closeModal("menu");
			if (type == "twoCol") {
				closeModal("video");
			}
 		}
		
	}, 100);

}


function filterImages() {

	$(".filter-options").click(function(){

		var type = $(this).attr("id"); //video
		var filter = $(this).data("type"); //twoCol

		window.history.pushState({work:filter}, null, type);
		prevDataIndex.push($(this).data("index"));
		var nullPresent = prevDataIndex.some(function (el) {
    		if (el === null) {
    			delete prevDataIndex[prevDataIndex.indexOf(el)];
    		}
		});
		
		changeView(type,filter,$(this).data("index"));
	});	
}

function modalOffSet() {

	// Get the window viewport height
	viewportHeight = $(window).height();
	// cache your dialog element
	$myDialog = $('.modalPicture');
	// now set your dialog position
	$myDialog.css('top',  (viewportHeight/2)+ $(document).scrollTop());
}

function arrowOffSet() {
	// Get the window viewport height
	viewportHeight = $(window).height();
	// cache your dialog element
	$myDialog = $('.arrowContainer');
	// now set your dialog position
	$myDialog.css('top',  (viewportHeight/2)+ $(document).scrollTop());
}

function changeType(thePic) {

	var picType = thePic.getAttribute('data-type');
	
	if (picType) {
		$("#biggerImage").attr("data-type", picType);
	} else {
		$("#biggerImage").attr("data-type", "");
	}
}

function popPicture(thePicture) {

	var videoType = thePicture.attr("data-type");
	
	if (videoType == "video") {
		
		// ***** OLD CODE TO SHOW MODAL ***** 
		// var mask = $("#filter-mask");
		// mask.addClass("filter-mask");

		// setTimeout(function(){
		// 	$(".selected").css("display", "none");
		// 	$(".selected").removeClass("selected");
		// 	showModal("video");
		// }, 100);

		// setTimeout(function(){
			
		// 	$(".filter-mask").removeClass("filter-mask");

		// 	var theId = Number(thePicture.attr('data-index'));
		// 	$(".videoTitle").text(videoTitle[theId]);
		// 	$(".videoSource").attr('src', videoSource[theId]);

		// }, 500);

		// NEW CODE TO SCALE UP
		$(".selected.twoCol").css("opacity", "0");
		thePicture.parent().css("opacity", "1");
		
		var scaleValue2 = 1;
		var centerValue2 = "0";

		var scaleValue = 2;
		var centerValue = "24%";

		thePicture.css({
			    '-moz-transform': 'scale(' + scaleValue2 + ') translateX('+ centerValue2 + ')',
			    '-webkit-transform': 'scale(' + scaleValue2 + ') translateX('+ centerValue2 + ')',
				'-ms-transform': 'scale(' + scaleValue2 + ') translateX('+ centerValue2 + ')',
				'-o-transform': 'scale(' + scaleValue2 + ') translateX('+ centerValue2 + ')',
				'transform': 'scale(' + scaleValue2 + ') translateX('+ centerValue2 + ')'
			});
		thePicture.parent().css({
			    '-moz-transform': 'scale(' + scaleValue + ') translateX('+ centerValue + ')',
			    '-webkit-transform': 'scale(' + scaleValue + ') translateX('+ centerValue + ')',
				'-ms-transform': 'scale(' + scaleValue + ') translateX('+ centerValue + ')',
				'-o-transform': 'scale(' + scaleValue + ') translateX('+ centerValue + ')',
				'transform': 'scale(' + scaleValue + ') translateX('+ centerValue + ')'
			});


	} else {

		showModal("picture");
		$(".arrows").show();
		$(".arrows").css("display", "block");
		changeType(thePicture[0]);
	
		$("#biggerImage").one('load', function(){
			modalMobileReady();
		}).attr('src', thePicture.attr('data-full-path'));

		$("#close").show();
		$("#close").css("display", "block");
	}	
	
}

function hideModalStuff() {

	$("#biggerImage").removeAttr('src');
	$("#biggerImage").removeAttr('class');
	
	$(".modalPicture").css('min-width', '');
	$(".modalPicture").removeClass("mobileDiv");
	$(".current").removeClass("current");
		
	$(".videoSource").attr('src', $(".videoSource").attr('src'));

	$(".arrows").hide();
	$(".arrows").css("display", "none");	

	$("#close").hide();
	$("#close").css("display", "none");
	closeModal("picture");
}

function clickPicture() {
	
	$(".container .image-div img").click(function(){
		
		var type = $(this).attr('id');
		
		if (type != 'me') {
			
			$(this).addClass("current");
			popPicture($(this));
			
			//To go back to main video screen
			$("#back").click(function(){
				changeView("twoCol");
			});
			
		}

	});

	$(".modal.picture").click(function(){

		if ($(this) == $("#biggerImage")) {
		
		} else {
			hideModalStuff();
		}
		
	});

	/*
	$("#burger").click(function(){
		$(this).css("z-index", "8");
		hideModalStuff();
	});
	*/
	$("#close").click(function(){
		hideModalStuff();
	});

}

function goMobile(image, div) {
	image.addClass("mobile");
	div.css('min-width', '');
	div.addClass("mobileDiv");
}

function goWide(image, div) {
	image.removeClass("mobile");
	div.removeClass("mobileDiv");			
	div.css('min-width', String(image.width()) + "px");
}


function modalMobileReady() {

	var image = $("#biggerImage");
	var imageWidth = $("#biggerImage")[0].clientWidth;
	var div = $(".modalPicture");
	var windowWidth = document.documentElement.clientWidth;
	var type = "";

	goWide(image, div);
	var breakpoint = image[0].clientWidth + 58;

	//For portrait images
	if (image.attr("data-type")) {
		type = image.attr("data-type");
	}

	if (type == "portrait") {

		if (windowWidth <= breakpoint) {
			goMobile(image, div);
		} else {
			goWide(image, div);
		}

	} else {
		
		if (windowWidth <= breakpoint) {
			goMobile(image, div);
		} else {
			goWide(image, div);
		}
	}
}

function goLeft(imageToChange, prev) {

	imageToChange.fadeOut(100, function(){

	  	imageToChange.one('load', function(){
	  		imageToChange.fadeIn(200);
	  		changeType(prev);
	  		modalMobileReady();	
	  	}).attr('src', prev.getAttribute('data-full-path'));
	  	
	  	$(".current").removeClass("current");
	  	prev.className += " current";

	  });

}

function goRight(imageToChange, next) {

	imageToChange.fadeOut(100, function(){

		imageToChange.one('load', function(){
			imageToChange.fadeIn(200);
			changeType(next);
			modalMobileReady();
		}).attr('src', next.getAttribute('data-full-path'));
		
		$(".current").removeClass("current");
  		next.className += " current";
	});
		  	
}

function modalControl() {

	var imageToChange = $("#biggerImage");
	var modal = $(".modalPicture");

	$(".arrows").click(function(){
		
		//Setup Variables - next - prev
		var selectedDiv = $(".current");
		var next;
		var prev;

		if (selectedDiv.parent().next(".selected").length) {
			next = selectedDiv.parent().next(".selected").children()[0];
		} else {
			next = $(".selected:first").children()[0];
		}

		if (selectedDiv.parent().prev(".selected").length) {
			prev = selectedDiv.parent().prev(".selected").children()[0];
		} else {
			prev = $(".selected:last").children()[0];
		}

		if ($(this).attr('id') == "left") {
			//Go Left
			goLeft(imageToChange, prev);
		} else {
			//Go Right
			goRight(imageToChange, next);
		}
	});

	
	$("html").keydown(function(event) {

		//Setup Variables - next - prev
		var selectedDiv = $(".current");
		var next;
		var prev;
		
		if (selectedDiv.parent().next(".selected").length) {
			next = selectedDiv.parent().next(".selected").children()[0];
		} else {
			next = $(".selected:first").children()[0];
		}

		if (selectedDiv.parent().prev(".selected").length) {
			prev = selectedDiv.parent().prev(".selected").children()[0];
		} else {
			prev = $(".selected:last").children()[0];
		}


		if (event.keyCode == 37) { 
		  goLeft(imageToChange, prev);
		} else if (event.keyCode == 39) {
		  	goRight(imageToChange, next);
		}
	})
	
}
/* Called once before the page even finishes loading all elements to make sure it displays correct height */
// adjustHeight($(".selected").attr('id'));

// if ($("#firstImage").parent().height() == 0) {
// 	adjustHeight($(".selected").attr('id'));
// }

$(document).ready(function(){

	$(".three-d").hover(function(){

		if (!($(this).children().children()[0].classList.contains('default'))) {
			$(".default").addClass("not");
		}
		$(this).children().children().addClass("it");
	}, function(){
		$(".default").parent().removeClass("transform");
		$(".default").removeClass("not");
		$(this).children().children().removeClass("it");
	});

	$(".selected")[0].style.display = "block";
	$(".selected img")[0].src = $(".selected img")[0].getAttribute('data-src');

	var loadImage = new Image();
 	loadImage.src = $(".selected img")[0].src;

  	loadImage.onload = function(){

  		if ( $(".selected")[0].getAttribute('data-portrait') ) {
  			
  			var index = $(".selected")[0].getAttribute('data-portrait');
  			prevDataIndex.push(index);
  			$(".firstPortrait")[index].style.display = "block";
			$(".firstPortrait img")[index].src = $(".firstPortrait img")[index].getAttribute('data-src');

  			var loadPortrait = new Image();
			loadPortrait.src = $(".firstPortrait img")[index].src;

			loadPortrait.onload = function() {
				adjustHeight($(".selected").attr('id'), index);
				$("#firstImage").css("opacity", "1.0");
				$(".firstPortrait")[index].style.opacity = "1.0";
			}
  		} else {
  			prevDataIndex.push($(".selected").data("portrait"));
  			adjustHeight($(".selected").attr('id'), $(".selected").data("portrait"));
			$("#firstImage").css("opacity", "1.0");
  		}
  	}

	showNav();
	filterImages();
	clickPicture();
	modalControl();

	$(window).resize(function() {
  		
  		//For height of gallery pictures
  		adjustHeight($(".selected").attr('id'), $(".selected").data("portrait"));
  		//For dynamix resizing
  		modalMobileReady();
  		//For hiding and showing burger/nav bar
  		showNav();
  		
	});

	window.onpopstate = function (event) {
		
		var nullPresent = prevDataIndex.some(function (el) {
    		return el === null;
		});

  		if (prevDataIndex.length >= 1 && !nullPresent && window.history.state != null) {
  			console.log("BUTTON PRESS!");
  			
  			var currentState = window.history.state.work;
  			var element = $("." + String(currentState));

  			prevDataIndex.pop();
  			changeView(element.data('identifier'), currentState, prevDataIndex.pop());
  			prevDataIndex.push(element.data('portrait'));
  			
  		} else {
  			window.history.back();
  		}
	}	

	$('#burger').click (function(){
  		
  		if ($(this).attr('class') == 'open') {
  			closeModal("menu");
  		} else {
  			showModal("menu");
  		}
  		$(this).toggleClass('open');
	});
	
});