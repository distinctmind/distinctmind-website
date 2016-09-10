
var details = [

		{img: "Resources/Images/Secure Line.jpg", caption: "Secure Line", text: "Beneath all the sounds and chaos"},
		{img: "Resources/Images/Undercover.jpg", caption: "Undercover", text: "Keep it low key"},
		{img: "Resources/Images/Angels over The City.jpg", caption: "Angels Over The City", text: "Angels watching your every step"},
		{img: "Resources/Images/Splashes of life.jpg", caption: "Splashes Of Life", text: "Pay attention to the beauty around you"},
		{img: "Resources/Images/Too cold to think.jpg", caption: "Too Cold To Think", text: "Wisdom is the key to move forward"}

];



var slideshow = {};
slideShowStart("#slideshow", 3000);

$("#further").on("click", function(){
	location.href = "Main Page/main.html";
});

	
	

function slideShowStart(e, delay, random) {
	delay = (delay == null) ? 2500 : delay;
	random = (random == null) ? false : random;
	$(e).find(".image").hide();

	var id = $(e).attr("id");
	slideshow[id] = {}
	slideshow[id].items = $(e).find(".image");
	slideshow[id].delay = delay;
	slideshow[id].random = random;
	var s = slideshow[id];

	slideshowShow(id);

	$(".hoverDiv").hover(function(){
		s.pause = true;
		$(s.items[s.i]).removeClass("removeHover");
		$(s.items[s.i]).addClass("hoverImage");


		$("#details").html('<h4>' + details[s.i].caption + '</h4> <p>' + details[s.i].text + '</p>')
		$(".extraz").removeClass("hide");
		$(".extraz").addClass("appear");

		$("#further").hover(function(){
			$("#goThroughScreen").css("opacity", "0.7")
		}, function(){
			$("#goThroughScreen").css("opacity", "0")
	});

	

	}, function(){
		s.pause = false;
		$(s.items[s.i]).addClass("removeHover");
		$(s.items[s.i]).removeClass("hoverImage");
		

		$(".extraz").addClass("hide");
		$(".extraz").removeClass("appear");
		setTimeout(function(){
			slideshowHide(id, $(s.items[s.i]));
		}, 3000);
	});
	

}
 
function slideshowShow(id) {
	
	var s = slideshow[id];

	if (s.pause) {
		return;
	}

	if (s.random) {
		s.i = Math.floor(Math.random()*s.items.length);
	}

	else 
	 (s.i == null || s.i+1 >= s.items.length) ? s.i = 0 : s.i++;

		$(s.items[s.i]).fadeIn(400).animate({opacity: 1.0}, s.delay, function(){
			if (!s.pause) {
				slideshowHide(id, $(s.items[s.i]));	
			}
	});
	
}

function slideshowHide(id, e) {
	var s = slideshow[id];
	if (s.fade) {
		return;
	}

	s.fade = true
	setTimeout(function(){
		$(e).fadeOut(400, function(){
		s.fade = false;
		(s.pause) ? $(e).fadeIn(400) : slideshowShow(id);
	});
	}, 3000);
	
}



	

















