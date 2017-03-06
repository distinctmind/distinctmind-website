$(document).ready(function(){

	var streetList = $(".navItems");
	var streetListAnchor = $(".navItems a");

	streetList.hover(function() {

		$(this).addClass("listHoverOn");
		$(this).find(".anchorNavItems").addClass("anchorHoverOn");

	}, function(){
		$(this).removeClass("listHoverOn");
		$(this).find(".anchorNavItems").removeClass("anchorHoverOn");
	});

});