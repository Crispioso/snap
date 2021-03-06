//main.js

$( document ).ready(function(){
	//List functions you're using here. The order matters..
	addActive();
	animateScroll();



	//START OF FUNCTIONS

	//Find position on page and set associated nav link as active
	function activeHeading(){
		//Remove html and body height 100% to allow jquery scroll functions to work properly
        $('html, body').css('height', 'auto');
		
		//Empty array to store heading ids and their page position
		var heading = [];
		var headingPos = []

		//Loop to get id attribute of each heading 2
		$('h2[id]').each(function(index){
			heading[index] = $(this).attr('id');
			console.log(heading[index]);

			headingPos[index] = $('#' + heading[index]).offset().top - 96;
		});

		//Current scroll position on page
		var winScroll = $(document).scrollTop();

		//Stores the generated if statements - saves writing them out manually.
		var ifLoop = [];

		//Function to check if active link needs to be added
		function ifPosition(index) {
			return function() {
				//Store heading name for re-use
				var navLink = '#' + heading[index];

				//If scroll position equal or more than heading position add class. If last in array and scroll position more then add class. Else remove class.
				//TODO store reused functions
				if (winScroll < headingPos[0] || winScroll == 0) {
					// $('a[href="#home"]').css('color', '#551A8B');
					$('a[href="' + navLink + '"]').removeClass('nav__link--active');
					$('.nav__subtitle').slideDown("fast");
					$('.nav__logo').removeClass('nav__logo--shrunk');
					$('.nav__item').removeClass('nav__item--shrunk');

				} else if( winScroll >= headingPos[index] && winScroll < headingPos[index+1] ){
					$('a[href="' + navLink + '"]').addClass('nav__link--active');
					// $('a[href="#home"]').css('color', '#414042');
					$('.nav__subtitle').slideUp("fast");
					$('.nav__logo').addClass('nav__logo--shrunk');
					$('.nav__item').addClass('nav__item--shrunk');
					// $('.nav__logo').animate({fontSize : '32px'}, 200, function(){
					// 	console.log("Font-size = 32px");
					// });

				} else if( winScroll >= headingPos[index] && index == heading.length-1 ) {
					$('a[href="' + navLink + '"]').addClass('nav__link--active');
					// $('a[href="#home"]').css('color', '#414042');
					//$('.nav__subtitle').hide("slow");

				} else {
					$('a[href="' + navLink + '"]').removeClass('nav__link--active');
					// $('a[href="#home"]').css('color', '#414042');
					//$('.nav__subtitle').hide("slow");
				}
			}
		}

		//Put each if into the ifLoop array
		$('h2').each(function(index) {
			ifLoop[index] = ifPosition(index);
		});

		//Fire each if statement from the ifLoop array
		$('h2').each(function(run) {
			ifLoop[run]();
		});	

	}

	//Run function on scroll to detect scroll position and make correct link active
	function addActive() {
		$(window).scroll(function(){
			activeHeading();
		});
	}


	//Animate scroll to any hashes from anchor click
	function animateScroll() {
		//On page load
		$(document).ready(function(e) {
			//e.preventDefault();

			if(location.hash) {
				//Get hash part of href from anchor
				var target = location.hash;

				//console.log(target);

				//Animated scroll to location
				if (target == '#home' ) {
					//Go to absolute top of page if clicking 'home'
					$('html, body').animate({scrollTop: $(target).offset().top - 96}, 1000, function(){
						location.hash = target;
					});
				} else {
					$('html, body').animate({scrollTop: $(target).offset().top - 120}, 1000, function(){
						location.hash = target;
					});
				};
			}
		});


		//On click
		$('a').click(function(e) {
			e.preventDefault();

			//Get hash part of href from anchor
			var target = this.hash;
			
			//Add class to show it's active
			// $(this).addClass('nav__link--active');

			//Animated scroll to location
			if (target == '#home' ) {
				//Go to absolute top of page if clicking 'home'
				$('html, body').animate({scrollTop: $(target).offset().top - 136}, 1000, function(){
					location.hash = target;
				});
			} else {
				$('html, body').animate({scrollTop: $(target).offset().top - 96}, 1000, function(){
					location.hash = target;
				});
			};

			
			
		})
	}

	//END OF FUNCTIONS
});