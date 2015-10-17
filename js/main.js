//main.js

$( document ).ready(function(){
	//List functions you're using here. The order matters..
	addActive();



	//START OF FUNCTIONS

	//Find position on page and set associated nav link as active
	function activeHeading(){
		//Remove html and body height 100% to allow jquery scroll functions to work properly
        $('html, body').css('height', 'auto');
		
		//Empty array to store heading ids and their page position
		var heading = [];
		var headingPos = []

		//Loop to get id attribute of each heading 2
		$('h2').each(function(index){
			heading[index] = $(this).attr('id');
			// console.log('heading = #' + heading[index]);

			headingPos[index] = $('#' + heading[index]).offset().top - 72;
			// console.log('position = ' + headingPos[index]);
		});

		var winScroll = $(document).scrollTop();
		var winH      = $(window).height();

		// console.log('Scroll position = ' + winScroll);
		// console.log('Heading 1 position = ' + headingPos[0]);


		//Stores the generated if statements
		var ifLoop = [];

		//Function to check if active link needs to be added
		function ifPosition(index) {
			return function() {
				//Store heading name for re-use
				var navLink = '#' + heading[index];

				if( winScroll >= headingPos[index] && winScroll < headingPos[index+1] ) {

					$('a[href="' + navLink + '"]').addClass('nav__link--active');

				} else if( winScroll >= headingPos[index] && index == heading.length-1 ) {

					$('a[href="' + navLink + '"]').addClass('nav__link--active');

				} else {
					$('a[href="' + navLink + '"]').removeClass('nav__link--active');
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


	//END OF FUNCTIONS
});