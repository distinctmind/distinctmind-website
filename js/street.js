
/* Used to continually adjust the fixed height of each div upon window resize */
/* Note this doesn't change the size of the first div because every other div's height is based on the first one. */
function adjustHeight() {
	var currentImageHeight = $("#firstImage").height();
	$(".container .image-div").css('height', currentImageHeight);
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
			$(".filter-mask").removeClass("filter-mask");

		}, 500);

	});
}

function popPicture(thePicture) {
	showModal("picture");
	$("#biggerImage").attr('src', thePicture.attr('data-full-path'));	
}

function clickPicture() {

	$(".container .image-div img").click(function(){
		popPicture($(this));
	});

	$(".modal.picture").click(function(){

		if ($(this) == $("#biggerImage")) {
		} else {
			closeModal("picture");
		}
		
	});
}
/* Called once before the page even finishes loading all elements to make sure it displays correct height */
adjustHeight();


$(document).ready(function(){

	filterImages();
	clickPicture();

	$(window).resize(function() {
  		
  		adjustHeight();
  		
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