
/* Used to continually adjust the fixed height of each div upon window resize */
/* Note this doesn't change the size of the first div because every other div's height is based on the first one. */
function adjustHeight() {
	var currentImageHeight = $("#firstImage").height();
	$(".container div").css('height', currentImageHeight);
}

function hoverNavLinks() {

	var streetList = $(".navItems");
	var streetListAnchor = $(".navItems a");

	streetList.hover(function() {

		$(this).addClass("listHoverOn");
		$(this).find(".anchorNavItems").addClass("anchorHoverOn");

	}, function(){
		$(this).removeClass("listHoverOn");
		$(this).find(".anchorNavItems").removeClass("anchorHoverOn");
	});
}

/* Called once before the page even finishes loading all elements to make sure it displays correct height */
adjustHeight();


$(document).ready(function(){

	$( window ).resize(function() {
  		adjustHeight();
	});

	//Style applied when user hovers the navigation links
	hoverNavLinks();
	
});