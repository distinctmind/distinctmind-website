function setContainerHeight(amount) {

	var selectedDivs = $(".selected");
	var totalHeight = 0;

	for (var i = 0; i < selectedDivs.length/amount; i++) {
		totalHeight += selectedDivs[i].clientHeight + 50;
	}
	$(".container").css("height", String(totalHeight) + "px");
}


function setLeft() {

	
	var selectedDivs = $(".selected");
	var selectedDivsImg = selectedDivs.children();
	var imageWidth = selectedDivsImg[0].clientWidth;
	var windowWidth = window.innerWidth;
	
	var leftAmount = 0;
	var topAmount = 0;
	var largestHeight = 0;
	var rowHeight = 0;


	if (windowWidth >= 1200) {

		for (var i = 0; i < selectedDivs.length; i++) {
			
			if (selectedDivsImg[i].hasAttribute('data-type')) {

				if (selectedDivsImg[i].getAttribute('data-type') == 'portrait') {
					console.log("Portrait Image!");
					console.log("Portrait Height: " + String(selectedDivs[i].clientHeight));
					console.log("");
					largestHeight = selectedDivs[i].clientHeight;
				}
			}
			
			leftAmount = (windowWidth-(imageWidth*3+40))/2 + (i % 3)*(imageWidth + 20);
			//topAmount = (Math.floor(i/3)*(rowHeight+50));

			selectedDivs[i].style.top = String(rowHeight) + "px";
			
			if ((i+1)%3 == 0 || selectedDivs[i].getAttribute('id') == 'about') {
				rowHeight +=  selectedDivsImg[i].clientHeight + 30;
			}
			selectedDivs[i].style.left = String(leftAmount) + "px";

		}

		$("#logo").css("margin-left", String( (windowWidth-(imageWidth*3+40))/2 + "px"));
		
	} else if (windowWidth > 750 && windowWidth < 1200) {
		
		for (var i = 0; i < $(".selected").length; i++) {

			largestHeight = Math.max(selectedDivs[i].clientHeight, largestHeight);
			leftAmount = (windowWidth-(imageWidth*2+20))/2 + (i % 2)*(imageWidth + 20);
			
			if (i >= 2 && selectedDivs[i-2]) {

				if (selectedDivs[i-2].getAttribute('id') == 'thirdPortrait') {
					leftAmount = (windowWidth-(imageWidth*2+20))/2 + (i+1 % 2)*(imageWidth + 20);
				}
			}

			if (selectedDivsImg[i].hasAttribute('data-type')) {
				
				if (selectedDivsImg[i].getAttribute('data-type') == 'portrait') {
					
					largestHeight = selectedDivs[i].clientHeight;

					if (selectedDivs[i].getAttribute('id') == 'thirdPortrait') {
						largestHeight = 0;
					}
				}
			}

			//topAmount = (Math.floor(i/2)*(rowHeight+50));
			selectedDivs[i].style.left = String(leftAmount) + "px";
			selectedDivs[i].style.top = String(rowHeight) + "px";

			if ((i+1)%2 == 0) {
				rowHeight += largestHeight + 30;
				largestHeight = 0;
			}
		}

		$("#logo").css("margin-left", String((windowWidth-(imageWidth*2+20))/2 + "px"));
		
	
	} else if (windowWidth <= 750) {

		console.log("Smaller than 750");

		for (var i = 0; i < $(".selected").length; i++) {

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

		$("#logo").css("margin-left", String( (windowWidth-(imageWidth))/2 + "px"));
	
	}
	$(".container").css("height", String(rowHeight) + "px");
}

/* Used to continually adjust the fixed height of each div upon window resize */
/* Note this doesn't change the size of the first div because every other div's height is based on the first one. */

function adjustHeight(type) {
	
	var selectedDivs = $(".selected");
	var selectedDivsImg = selectedDivs.children();


	var firstImage = selectedDivsImg[0];
	var firstPortrait = $("#firstPortrait img")[0];
	var currentLandscapeHeight = firstImage.clientHeight;
	var currentPortraitHeight = firstPortrait.clientHeight;


	
	console.log("In adjust height");
	console.log("landscape height is " + String(currentLandscapeHeight));
	console.log("portrait height is " + String(currentPortraitHeight));
	console.log("");

	//Make sure the first image div can be displayed
	if (selectedDivsImg[0].getAttribute('class') == 'me') {		
		//$(".me").parent()[0].style.left = String((window.innerWidth-($("#aboutDiv").width()+20)))/2+"px";
		setContainerHeight(1);
	} else {
		
		//Go through all selected elements
		for (var i = 0; i < selectedDivs.length; i++) {
			
			//Portrait Image or Video Image
			if (selectedDivsImg[i].hasAttribute('data-type')) {
				
				//Portrait
				if (selectedDivsImg[i].getAttribute('data-type') == 'portrait') {
					if (selectedDivs[i].getAttribute('id') == 'firstPortrait') {
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
		
		if (type == "videos") {

			if (window.innerWidth <= 750) {
				$(".navBar").css("right", String((theWindow-(firstImage.clientWidth*2+20))/2 + "px"));
				setContainerHeight(1);
				
			} else {
				setContainerHeight(2);
				$(".navBar").css("right", String( (theWindow-(firstImage.clientWidth))/2 + "px"));
			} 
			
		} else {

			setLeft();
			var theWindow = $(window).width();
		
			if (theWindow >= 1200) {
				$(".navBar").css("right", String((theWindow-(firstImage.clientWidth*3+40))/2 - (theWindow - ($("body").width())) + "px"));
			} else if (theWindow > 750 && theWindow < 1200) {
				var portraitHeight = (currentLandscapeHeight*2) + 30;
				$("#thirdPortrait").css('height', portraitHeight);
				$(".navBar").css("right", String((theWindow-(firstImage.clientWidth*2+20))/2 + "px"));
			} else {
				$(".navBar").css("right", String( (theWindow-(firstImage.clientWidth))/2 + "px"));
			}
		}


	}
}

function showNav() {

	if ($(window).width() <= 917) {
			
		$("header .navBar").fadeOut(300);
		
		$("#burger").removeClass("open");
		$("#burger").css("display", "block");
		
		// if ($(window).width() <= 750) {
		// 	changePictures();
		// }
	} else {
		$("header .navBar").fadeIn(300);
		$("#burger").hide();
		$("#burger").css("display", "none");
	}
}

var biggerImages = [ 

		'../Images/street/medium/01.jpg',
		'../Images/street/medium/02.jpg',
		'../Images/street/medium/03.jpg',
		'../Images/street/medium/04.jpg',
		'../Images/street/medium/05.jpg',
		'../Images/street/medium/06.jpg'
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

	$(".modal.picture").show();
	//$(".modal.picture").css('display', 'block');

	if (mode == "picture") {
		$(".modalPicture").css('display', 'block');
	} else if (mode == "video") {
		$(".modalVideo").css('display', 'block');
	} else if (mode == "about") {
		$(".modalAbout").css('display', 'block');
	} else {
		$("#burger").css("z-index", "999");
		var newFilter = ".modal." + mode;
		$(newFilter).css("display", "block");
	}
	$("html").css('overflow-y', 'hidden');
}

function closeModal(mode) {
	
	$("#burger").css("z-index", "8");

	$(".modal" + "." + mode).hide();
	$(".modal" + "." + mode).css('display', 'none');
	
	$(".modalPicture").css('display', 'none');
	$(".modal.picture").hide();
	$(".modal.picture").css('display', 'none');
	$(".modalVideo").css('display', 'none');
	$(".modalAbout").css('display', 'none');

	$("html").css('overflow-y', 'visible');
}

function changePictures() {

	$(".container div img").each(function(i) {
		$(this).attr('src', biggerImages[i]);
	});

}

function showPictures(theFilter) {

	var images = $(theFilter);
	
	for (var i = 1; i < images.length; i++) {
		images[i].src = images[i].getAttribute('data-src');
	}
	if (theFilter == ".image-div.faces img") {
		$("#firstPortrait").css("opacity", "1.0");
	}
	$("#firstImage").parent().css("opacity", "1.0");
}

function changeView(filter) {
	
		
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
		
		//OLD
		firstParent.css("opacity", "0");
		firstParent.css("display", "block");

		firstChild[0].src = firstChild[0].getAttribute('data-src');

		if (filter == "faces") {
			$("#firstPortrait").css("display", "block");
			$("#firstPortrait img")[0].src = $("#firstPortrait img")[0].getAttribute('data-src');
		}
		
		var loadImage = new Image();
 		loadImage.src = firstChild[0].src;

  		loadImage.onload = function(){
   			 // hide loader code here
   			console.log("done");
			adjustHeight(filter);
			showPictures(".image-div" + "." + filter + " img");
			$(".filter-mask").removeClass("filter-mask");
			closeModal("menu");
 		}
		
	}, 100);

	// setTimeout(function(){
	// 	showPictures(".image-div" + "." + filter + " img");
	// 	$(".filter-mask").removeClass("filter-mask");
	// 	closeModal("menu");
	// }, 500);
}


function filterImages() {

	$(".filter-options").click(function(){
		var filter = $(this).attr("id");
		$("#burger").removeClass("open");
		changeView(filter);
		//var stateObj = { street: filter };
		//history.pushState(stateObj, filter, filter + ".html");
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
		
		var mask = $("#filter-mask");
		mask.addClass("filter-mask");

		setTimeout(function(){
			$(".selected").css("display", "none");
			$(".selected").removeClass("selected");
			$(".modalVideo").css("display","block");
		}, 100);

		setTimeout(function(){
			
			$(".filter-mask").removeClass("filter-mask");

			var theId = Number(thePicture.attr('data-index'));
			$(".videoTitle").text(videoTitle[theId]);
			$(".videoSource").attr('src', videoSource[theId]);

		}, 500);


	} else {

		showModal("picture");
		$(".arrows").show();
		$(".arrows").css("display", "block");
		changeType(thePicture[0]);

		$("#biggerImage").attr('src', thePicture.attr('data-full-path'));
		$("#biggerImage").one("load",function(){modalMobileReady()});
	

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
				changeView("videos");
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


function modalMobileReady() {

	var image = $("#biggerImage");
	var imageWidth = $("#biggerImage").width();
	var div = $(".modalPicture");
	var type = "";

	if (image.attr("data-type")) {
		type = image.attr("data-type");
	}

	if (type == "portrait") {

		if ($(window).width() <= 475) {
			
			image.addClass("mobile");
			div.css('min-width', '');
			div.addClass("mobileDiv");

		} else {

			image.removeClass("mobile");
			div.removeClass("mobileDiv");
			
			var modalWidth = imageWidth;
			div.css('min-width', String(modalWidth) + "px");

		}

	} else {

		if ($(window).width() <= 880) {
			
			image.addClass("mobile");
			div.css('min-width', '');
			div.addClass("mobileDiv");

		} else {

			image.removeClass("mobile");
			div.removeClass("mobileDiv");
			
			var modalWidth = imageWidth;
			div.css('min-width', String(modalWidth) + "px");

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

	$(".selected")[0].style.display = "block";
	$(".selected img")[0].src = $(".selected img")[0].getAttribute('data-src');

	var loadImage = new Image();
 	loadImage.src = $(".selected img")[0].src;

  	loadImage.onload = function(){
  		console.log("BEFORE ADJUST HEIGHT");
		console.log($(".selected img")[0].offsetHeight);
		console.log("");
		adjustHeight($(".selected").attr('id'));
		$("#firstImage").css("opacity", "1.0");
  	}
	
	filterImages();
	clickPicture();
	modalControl();

	$(window).resize(function() {
  		
  		//For height of gallery pictures
  		adjustHeight($(".selected").attr('id'));
  		//For dynamix resizing
  		modalMobileReady();
  		//For hiding and showing burger/nav bar
  		showNav();
  		
	});

	$( window ).scroll(function() { 
	  //Show scrollbar 

	  $('body').removeClass('hide-scrollbar');

	  // Check if we are still scrolling, else hide scrollbar
	  clearTimeout($.data(this, 'scrollTimer'));
	  $.data(this, 'scrollTimer', setTimeout(function() {
	    // Scrollevent not happened, hiding Scrollbar
	    $('body').addClass('hide-scrollbar');
	  }, 350));

	});


	showNav();

	$('#burger').click (function(){
  		
  		if ($(this).attr('class') == 'open') {
  			closeModal("menu");
  		} else {
  			showModal("menu");
  		}
  		$(this).toggleClass('open');
	});
		
});