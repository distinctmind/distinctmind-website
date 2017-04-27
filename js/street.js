/* Used to continually adjust the fixed height of each div upon window resize */
/* Note this doesn't change the size of the first div because every other div's height is based on the first one. */
function adjustHeight() {
	
	var currentLandscapeHeight = $("#firstImage").height();
	$(".container .landscape").css('height', currentLandscapeHeight);
	$(".container .portrait").css('height', $("#firstPortrait img").height());

	if ($(window).width() <= 1200) {
		var portraitHeight = (currentLandscapeHeight*2) + 50;
		$("#thirdPortrait").css('height', portraitHeight);
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

function showModal(mode) {

	$(".modal" + "." + mode).show();
	$(".modal" + "." + mode).css('display', 'block');
	if (mode == "picture") {
		$(".modalPicture").css('display', 'block');
	}
	$("html").css('overflow-y', 'hidden');
}

function closeModal(mode) {
	$(".modal" + "." + mode).hide();
	$(".modal" + "." + mode).css('display', 'none');
	if (mode == "picture") {
		$(".modalPicture").css('display', 'none');
	}
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

function filterImages() {

	$(".filter-options").click(function(){

		var filter = $(this).children().attr("class");
		showPictures(".image-div" + "." + filter + " img");
		

		$("#firstImage").removeAttr("id");
		var mask = $("#filter-mask");
		mask.addClass("filter-mask");

		var newSelector = ".image-div." + filter;

		$(newSelector).first().children().attr("id", "firstImage")

		setTimeout(function(){
			$(".image-div").removeClass("selected");
			$(newSelector).addClass("selected");
			closeModal("menu");
		}, 100);

		setTimeout(function(){
			adjustHeight();
			$(".filter-mask").removeClass("filter-mask");
		}, 500);

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

	console.log(thePic);
	var picType = thePic.getAttribute('data-type');
	
	if (picType) {
		$("#biggerImage").attr("data-type", picType);
	} else {
		$("#biggerImage").attr("data-type", "");
	}
}

function popPicture(thePicture) {

	showModal("picture");
	$(".arrows").show();
	$(".arrows").css("display", "block");
	changeType(thePicture[0]);	
	
	$("#biggerImage").attr('src', thePicture.attr('data-full-path'));
	$("#biggerImage").one("load",function(){modalMobileReady()});
	

	$("#biggerImage").one('load', function(){
		modalMobileReady();
	}).attr('src', thePicture.attr('data-full-path'));	
	
}

function clickPicture() {
	
	$(".container .image-div img").click(function(){
		$(this).addClass("current");
		popPicture($(this));

	});

	$(".modal.picture").click(function(){

		if ($(this) == $("#biggerImage")) {
		
		} else {

			$("#biggerImage").removeAttr('src');
			$("#biggerImage").removeAttr('class');
			$(".modalPicture").css('min-width', '');
			$(".modalPicture").removeClass("mobileDiv");

			$(".current").removeClass("current");
			$(".arrows").hide();
			$(".arrows").css("display", "none");
			closeModal("picture");
		}
		
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
		  //move to the left		 
		  goLeft(imageToChange, prev);
		
		} else if (event.keyCode == 39) {
		  	goRight(imageToChange, next);
		}
	})
	
}
/* Called once before the page even finishes loading all elements to make sure it displays correct height */
adjustHeight();


$(document).ready(function(){

	adjustHeight();
	filterImages();
	clickPicture();
	modalControl();

	$(window).resize(function() {
  		
  		adjustHeight();
  		modalMobileReady();
  			
  		if ($(window).width() <= 917) {
			$("header .navBar").fadeOut(300);

			if ($(window).width() <= 750) {
				changePictures();
			}
  		} else {
  			$("header .navBar").fadeIn(300);
  		}
  		
	});

	if ($(window).width() <= 750) {
		changePictures();
	}

	$("#burgerIcon").click(function() {
		showModal("menu")
	});

	$("#closeModal").click(function() {
		closeModal("menu");
	});
		
});