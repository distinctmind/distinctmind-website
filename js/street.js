function setLeft() {
	
	var selectedDivs = $(".selected");
	var landscapeWidth = $(".selected")[0].clientWidth;
	var selectedDivsImg = selectedDivs.children();
	var windowWidth = $(window).width();
	
	var leftAmount = 0;
	var topAmount = 0;
	var largestHeight = 0;
	var rowHeight = 0;


	if (windowWidth >= 1200) {

		for (var i = 0; i < selectedDivs.length; i++) {
			
			if (selectedDivsImg[i].hasAttribute('data-type')) {
				if (selectedDivsImg[i].getAttribute('data-type') == 'portrait') {
					largestHeight = selectedDivs[i].clientHeight;
				}
			}
			
			leftAmount = (i % 3)*(selectedDivs[i].clientWidth + 20);
			topAmount = (Math.floor(i/3)*(rowHeight+50));
			selectedDivs[i].style.top = String(rowHeight) + "px";
			
			if ((i+1)%3 == 0 || selectedDivs[i].getAttribute('id') == 'about') {
				rowHeight +=  selectedDivsImg[i].clientHeight + 30;
			}
	
			selectedDivs[i].style.left = String(leftAmount) + "px";

		}

		$(".container").css("left", String(($(window).width()-(landscapeWidth*3+40)))/2+"px");

	} else if (windowWidth >= 750 && windowWidth < 1200) {
		
		for (var i = 0; i < $(".selected").length; i++) {

			if (windowWidth >= 750 && windowWidth < 1200) {
				$(".container").css("left", String(($(window).width()-(landscapeWidth*2+20)))/2+"px");
			}
			largestHeight = Math.max(selectedDivs[i].clientHeight, largestHeight);

			leftAmount = (i % 2)*(selectedDivs[i].clientWidth + 20);
			
			if (i >= 2 && selectedDivs[i-2]) {

				if (selectedDivs[i-2].getAttribute('id') == 'thirdPortrait') {
					leftAmount = (i+1 % 2)*(selectedDivsImg[i].clientWidth + 20);
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

			topAmount = (Math.floor(i/2)*(rowHeight+50));
			selectedDivs[i].style.left = String(leftAmount) + "px";
			selectedDivs[i].style.top = String(rowHeight) + "px";

			if ((i+1)%2 == 0) {
				rowHeight += largestHeight + 30;
				largestHeight = 0;
			}
		}
		$(".container").css("left", String(($(window).width()-(landscapeWidth*2+20)))/2+"px");
	} else if (windowWidth < 750) {

		for (var i = 0; i < $(".selected").length; i++) {

			if (selectedDivsImg[i].hasAttribute('data-type')) {
				if (selectedDivsImg[i].getAttribute('data-type') == 'portrait') {
					largestHeight = selectedDivs[i].clientHeight;
				}
			}
			rowHeight +=  selectedDivs[i].clientHeight + 30;
			topAmount = (i*(selectedDivs[i].clientHeight + 50));
			selectedDivs[i].style.top = String(topAmount) + "px";
			selectedDivs[i].style.left = 0;
		}
		$(".container").css("left", String(($(window).width()-(landscapeWidth)))/2+"px");
	}
	$(".container").css("height", String(rowHeight) + "px");
}

/* Used to continually adjust the fixed height of each div upon window resize */
/* Note this doesn't change the size of the first div because every other div's height is based on the first one. */

function adjustHeight(type) {
	
	var selectedDivs = $(".selected");
	var selectedDivsImg = selectedDivs.children();
	//Make sure the first image div can be displayed
	if (selectedDivsImg[0].getAttribute('id') == 'me') {		
		$("#me").parent()[0].style.display = "inline-block";
		$("#me").parent()[0].style.left = "0px";
	} else {

		$("#firstImage").parent()[0].style.display = "inline-block";
		$("#firstImage").parent()[0].style.left = "0px";
		var currentLandscapeHeight = $("#firstImage").height();
		//Go through all selected elements
		for (var i = 0; i < selectedDivs.length; i++) {
			
			//Portrait Image or Video Image
			if (selectedDivsImg[i].hasAttribute('data-type')) {
				
				//Portrait
				if (selectedDivsImg[i].getAttribute('data-type') == 'portrait') {
					
					//Special case for first image
					//Since rest of portaits are based on first portrait
					if (selectedDivs[i].getAttribute('id') == 'firstPortrait') {
						$("#firstPortrait").css("left", "0px");
						$("#firstPortrait").css("display", "inline-block");
					} else {
						selectedDivs[i].style.height = String($("#firstPortrait img").height()) + "px";
						selectedDivs[i].style.display =  "inline-block";
					}
				//Video - treat as landscape
				} else {
					selectedDivs[i].style.height = String(currentLandscapeHeight) + "px";
					selectedDivs[i].style.display =  "inline-block";
				}		
				
			//Landscape
			} else {
				selectedDivs[i].style.height = String(currentLandscapeHeight) + "px";
				selectedDivs[i].style.display =  "inline-block";
			}
		}
		

		//**** ALL of the above can be done with these three lines of code: ****
		//$(".container .landscape").css('height', currentLandscapeHeight);
		//$(".container .videos").css('height', currentLandscapeHeight);
		//$(".container .portrait").css('height', $("#firstPortrait img").height());
		
		if (type != "videos" && type != "about") {
			setLeft();
		} else {
			$(".container").css("left", "0px");
			$(".container").css("height", "115vh");
		} 

		if ($(window).width() >= 750 && $(window).width() < 1200) {
			var portraitHeight = (currentLandscapeHeight*2) + 30;
			$("#thirdPortrait").css('height', portraitHeight);
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

	for (var i = 0; i < images.length; i++) {
		images[i].src = images[i].getAttribute('data-src');
	}
}

function changeView(filter) {

	showPictures(".image-div" + "." + filter + " img");
		
	$("#firstImage").removeAttr("id");
	var mask = $("#filter-mask");
	mask.addClass("filter-mask");

	var newSelector = ".image-div." + filter;
	var firstParent = $(newSelector).first();
	var firstChild = firstParent.children();
	
	//No need to add first image tag to about section
	if (filter != "about") {
		firstChild.attr("id", "firstImage");
	} 

	setTimeout(function(){
		$(".image-div").removeClass("selected");
		$(".image-div").css("display", "none");
		$(newSelector).addClass("selected");
		
		//OLD
		//firstParent.css("display", "block");

		closeModal("menu");
		//adjustHeight();
	}, 100);

	setTimeout(function(){
		adjustHeight(filter);
		$(".filter-mask").removeClass("filter-mask");
	}, 500);
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
adjustHeight("none");

if ($("#firstImage").parent().height() == 0) {
	adjustHeight("none");
}


$(document).ready(function(){

	adjustHeight("none");
	filterImages();
	clickPicture();
	modalControl();

	$(window).resize(function() {
  		
  		//For height of gallery pictures
  		adjustHeight($(".selected").attr('class').split(' ').slice(-1)[0]);
  		//For dynamix resizing
  		modalMobileReady();
  		//For hiding and showing burger/nav bar
  		showNav();
  		
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