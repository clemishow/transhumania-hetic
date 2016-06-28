 $(document).ready(function(){
    /*
    *** INIT 
    */

    $('ul.tabs').tabs();

    $('.slider').slider({
    	full_width: true,
    	interval: '99999'
    });
    $('.slider').slider('pause');

    /*
    *** FULL PAGE JS
    */

    $(document).ready(function() {
		$('#fullpage').fullpage({
			anchors: ['firstPage', 'secondPage', '3rdPage'],
			sectionsColor: ['transparent', 'transparent', 'transparent'],
			navigation: true,
			navigationPosition: 'right',
			navigationTooltips: ['First page', 'Second page', 'Third and last page']
		});
	});

    /*
    *** CONTAINER VIDEO
    */

    // CLOSE
    $('.video .cross').on('click', function() {
    	$('.container-video').css('display', 'none');
    	$('nav').css('z-index', '10');
    });

    // OPEN
    $('.play-video').on('click', function() {
    	$('.container-video').css('display', 'block');
    	$('nav').css('z-index', '-1');
    });
 });
      
   