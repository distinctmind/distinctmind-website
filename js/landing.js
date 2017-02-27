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

var i = 1;

document.addEventListener("DOMContentLoaded", function() {

	
	var picture = document.getElementById("fullscreen_image");
	var divpic = $("#fullscreen_div");

	var firstPic = '<img id="fullscreen_image" src="Images/landing/01.jpg">';
	
	window.setInterval(function(){

		
		if (i == pictures.length-1) {

			console.log('nihao');

			for (j = 0; j < pictures.length; j++) {
				console.log(pictures[j]);
			}

    		i = 0;

		} 
		console.log('1');

		$("#fullscreen_div").fadeOut(100, function() {

			console.log('2');

			$("#fullscreen_div img:last-child").remove();

			console.log('3');

			divpic.append(pictures[i]);

			i++;
		
		})
			.fadeIn(100);					
		
	}, 4000);

});

