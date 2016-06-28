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



// Function to toggle FullScreen on click
 function requestFullScreen() {
   var el = document.body;
   // Supports most browsers and their versions.
   var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen
   || el.mozRequestFullScreen || el.msRequestFullScreen;
   if (requestMethod) {
     // Native full screen.
     requestMethod.call(el);
   } else if (typeof window.ActiveXObject !== "undefined") {
     // Older IE.
     var wscript = new ActiveXObject("WScript.Shell");
     if (wscript !== null) {
       wscript.SendKeys("{F11}");
     }
   }
 }
