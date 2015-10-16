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

			headingPos[index] = $('#' + heading[index]).offset().top;
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
				if( winScroll > headingPos[index] && winScroll < headingPos[index+1] ) {
					console.log('Add active link to ' + heading[index]);
				}
			}
		}

		$('h2').each(function(index) {
			ifLoop[index] = ifPosition(index);
		});

		$('h2').each(function(run) {
			ifLoop[run]();
		});	

	}

	function addActive() {
		$(window).scroll(function(){
			activeHeading();
		});
	}


	//END OF FUNCTIONS
});