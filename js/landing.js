var pictures = [

		'<img id="fullscreen_image" src="Images/landing/01.jpg">',
		'<img id="fullscreen_image" src="Images/landing/02.jpg">',
		'<img id="fullscreen_image" src="Images/landing/03.jpg">',
		'<img id="fullscreen_image" src="Images/landing/04.jpg">',
		'<img id="fullscreen_image" src="Images/landing/05.jpg">',
		'<img id="fullscreen_image" src="Images/landing/06.jpg">',
		'<img id="fullscreen_image" src="Images/landing/07.jpg">',
		'<img id="fullscreen_image" src="Images/landing/08.jpg">',
		'<img id="fullscreen_image" src="Images/landing/09.jpg">',
		'<img id="fullscreen_image" src="Images/landing/10.jpg">'
]

document.addEventListener("DOMContentLoaded", function() {

	var i = 1;
	var divpic = $("#fullscreen_div");
	
	window.setInterval(function(){

		
		if (i == pictures.length-1) {

    		i = 0;

		} 

		divpic.fadeOut(100, function() {

			$("#fullscreen_div img:last-child").remove();

			divpic.append(pictures[i]);

			i++;
		
		})
			.fadeIn(100);					
		
	}, 4000);

});

