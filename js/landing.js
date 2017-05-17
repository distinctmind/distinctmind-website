$(document).ready(function() {

	$(".border").click(function(){
		window.location.href = "street/street.html";
	});
	
	$("#photos div:gt(0)").hide();

	setInterval(function(){


		var currentImage = $("#photos div:visible");

		var next = currentImage.next().length ? currentImage.next() : $("#photos div:eq(0)");

		currentImage.fadeOut(1000);

		next.fadeIn(1000);

	}, 4000);

});

