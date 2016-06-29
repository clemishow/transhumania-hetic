/**
*** SET UP 
*/

var compteur_volume		= 0, // CHECK PLAY AND PAUSE
	compteur_play 		= 1, // PAUSE == 1 & PLAY == 2
	compteur_fullscreen = 0, // CHECK FULLSCREEN MODE
	player 				= {};

// GENERAL
player.container 		  	   = document.querySelector('.player');
player.video     		  	   = player.container.querySelector('video');
player.container_controls 	   = player.container.querySelector('.controls');
// PROGRESS BAR 
player.seek_bar 		  	   = player.container.querySelector('.seek-bar');
player.cursor_bar	 	  	   = player.container.querySelector('.cursor-bar');
player.progress_bar 	  	   = player.container.querySelector('.progress-bar');
//VOLUME 
player.volume_button_container = player.container.querySelector('.button-volume-container');
player.volume_button	 	   = player.container.querySelector('.button-volume');
player.icon_volume_button	   = player.container.querySelector('.button-volume i');
player.volume_level		 	   = player.container.querySelector('.volume-level');
// PLAY
player.button_play		  	   = player.container.querySelector('.button-play');
player.icon_button_play	  	   = player.container.querySelector('.button-play i');
// PREVIEW
player.title_video		  	   = player.container.querySelector('.container-title-video');
player.preview_play 	  	   = player.container.querySelector('.container-play-preview');
// TIME 
player.currentTimeVideo		   = player.container.querySelector('.currentTime');
player.durationVideo		   = player.container.querySelector('.durationVideo');
// FULLSCREEN 
player.fullScreen_button	   = player.container.querySelector('.button-fullScreen')
player.icon_fullScreen_button  = player.container.querySelector('.button-fullScreen i')
appearControls();

/**
*** FUNCTIONS
*/

function Play() {
	removeControls();
	player.video.play();
	player.icon_button_play.classList.remove('fa-play');
	player.icon_button_play.classList.add('fa-pause');
	compteur_play = 2;
}

function Pause() {
	appearControls();
	player.video.pause();
	player.icon_button_play.classList.remove('fa-pause');
	player.icon_button_play.classList.add('fa-play');
	compteur_play = 1;
}

function appearControls() {
		player.container_controls.style.webkitTransform = 'translateY(-30px)';
		player.container_controls.style.mozTransform = 'translateY(-30px)';
		player.container_controls.style.msTransform = 'translateY(-30px)';
		player.container_controls.style.oTransform = 'translateY(-30px)';
		player.container_controls.style.transform = 'translateY(-30px)';
		setTimeout(function(){
			player.container_controls.style.opacity = '1';
		},100)
}

function removeControls() {
		player.container_controls.style.webkitTransform = 'translateY(0px)';
		player.container_controls.style.mozTransform = 'translateY(0px)';
		player.container_controls.style.msTransform = 'translateY(0px)';
		player.container_controls.style.oTransform = 'translateY(0px)';
		player.container_controls.style.transform = 'translateY(0px)';
		setTimeout(function(){
			player.container_controls.style.opacity = '0';
		},100)
}

function volumeStep() {
	if (compteur_volume == 0) {
		player.video.volume = 0;
    	player.volume_level.style.height = '0%';
    	player.icon_volume_button.classList.remove('fa-volume-up');
		player.icon_volume_button.classList.add('fa-volume-off');
    	setTimeout(function() {
    		compteur_volume = 1;
    	},100)

	}

	else if (compteur_volume == 1) {
		player.video.volume = 0.25;
    	player.volume_level.style.height = '25%';
    	player.icon_volume_button.classList.remove('fa-volume-off');
		player.icon_volume_button.classList.add('fa-volume-down');
    	setTimeout(function() {
    		compteur_volume = 2;
    	},100)
	}

	else if (compteur_volume == 2) {
		player.video.volume = 0.5;
    	player.volume_level.style.height = '50%';
    	setTimeout(function() {
    		compteur_volume = 3;
    	},100)
	}

	else if (compteur_volume == 3) {
		player.video.volume = 0.75;
    	player.volume_level.style.height = '75%';
    	player.icon_volume_button.classList.remove('fa-volume-down');
		player.icon_volume_button.classList.add('fa-volume-up');
    	setTimeout(function() {
    		compteur_volume = 4;
    	},100)
	}

	else if (compteur_volume == 4) {
		player.video.volume = 1;
    	player.volume_level.style.height = '100%';
    	setTimeout(function() {
    		compteur_volume = 0;
    	},100)
	}
}

// function dragProgressbar(e) {
// 	var ratio = (e.clientX - player.container.offsetLeft) / player.seek_bar.offsetWidth;
// 	var current = ratio * player.video.duration;
// 	player.video.currentTime = current;
// 	player.progress_bar.style.webkitTransform = 'scaleX' + ratio + ')';
// 	player.progress_bar.style.mozTransform = 'scaleX' + ratio + ')';
// 	player.progress_bar.style.msTransform = 'scaleX' + ratio + ')';
// 	player.progress_bar.style.oTransform = 'scaleX' + ratio + ')';
// 	player.progress_bar.style.transform = 'scaleX' + ratio + ')';
// 	player.cursor_bar.style.webkitTransform = 'scale(1)';
// 	player.cursor_bar.style.mozTransform = 'scale(1)';
// 	player.cursor_bar.style.msTransform = 'scale(1)';
// 	player.cursor_bar.style.oTransform = 'scale(1)';
// 	player.cursor_bar.style.transform = 'scale(1)';
// }

window.addEventListener('keydown', function(e) {
	var key = e.keyCode || e.which;
	switch(key) {
		case 32:
			if (compteur_play == 1) {
				Play();
			}

			else if (compteur_play == 2) {
				Pause();
			}
		break;

		case 13: 
			if (compteur_play == 1) {
				Pause();
				appearControls();
			}

			else if (compteur_play == 2) {
				Play();
				appearControls();
				setTimeout(function() {
					removeControls();
				},1500);
			}
		break;

		case 86: 
			 volumeStep();
		break;

		case 77:
			player.video.volume = 0;
	    	player.volume_level.style.height = '0%';
	    	player.icon_volume_button.classList.remove('fa-volume-up');
			player.icon_volume_button.classList.add('fa-volume-off');
	    	setTimeout(function() {
	    		compteur_volume = 1;
	    	},100)
	    break;

	    case 70:
	    	if (compteur_fullscreen == 0) {
	    		FullScreenIn();
		    	setTimeout(function() {
		    		compteur_fullscreen = 1;
		    	},100)
		    }

	    	else if (compteur_fullscreen == 1) {
	    		FullScreenOut();
		    	setTimeout(function() {
		    		compteur_fullscreen = 0;
		    	},100)
		    }
	}
});

function FullScreenIn() {
	if (player.video.requestFullscreen) {
  		player.video.requestFullscreen();
  		player.container_controls.style.position = 'absolute';
		player.container_controls.style.top = '93%';
		player.container_controls.style.width = '100%';
		player.icon_fullScreen_button.classList.remove('fa-expand');
		player.icon_fullScreen_button.classList.add('fa-compress');
	} 

	else if (player.video.mozRequestFullScreen) {
  		player.video.mozRequestFullScreen();
  		player.container_controls.style.position = 'absolute';
		player.container_controls.style.top = '93%';
		player.container_controls.style.width = '100%';
		player.icon_fullScreen_button.classList.remove('fa-expand');
		player.icon_fullScreen_button.classList.add('fa-compress');
	} 

	else if (player.video.webkitRequestFullscreen) {
  		player.video.webkitRequestFullscreen();
  		player.container_controls.style.position = 'absolute';
		player.container_controls.style.top = '93%';
		player.container_controls.style.width = '100%';
		player.icon_fullScreen_button.classList.remove('fa-expand');
		player.icon_fullScreen_button.classList.add('fa-compress');
	}
}

function FullScreenOut() {
	if (document.cancelFullScreen) {
        document.cancelFullScreen();
        	player.container_controls.style.position = 'relative';
			player.container_controls.style.top = '-22px';
			player.container_controls.style.width = '100%'; 
			player.icon_fullScreen_button.classList.remove('fa-compress');
			player.icon_fullScreen_button.classList.add('fa-expand');
			compteur_fullscreen = 0;
    }

    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        	player.container_controls.style.position = 'relative';
			player.container_controls.style.top = '-22px';
			player.container_controls.style.width = '100%';
			player.icon_fullScreen_button.classList.remove('fa-compress');
			player.icon_fullScreen_button.classList.add('fa-expand');
			compteur_fullscreen = 0;
    } 

    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
        setTimeout(function() {
        	player.container_controls.style.position = 'relative';
			player.container_controls.style.top = '-22px';
			player.container_controls.style.width = '100%';
			player.icon_fullScreen_button.classList.remove('fa-compress');
			player.icon_fullScreen_button.classList.add('fa-expand');
			compteur_fullscreen = 0;
        },100)
    }
} 


/**
***
***** CONTROLS 
***
*/


/**
*** SEEK BAR
*/
window.setInterval(function(){
	var progress_ratio 			= player.video.currentTime / player.video.duration,
		progress_ratio_percent  = progress_ratio * 100;

	// PROGRESS BAR 
	player.progress_bar.style.webkitTransform = 'scaleX(' + progress_ratio + ')';
	player.progress_bar.style.mozTransform = 'scaleX(' + progress_ratio + ')';
	player.progress_bar.style.msTransform = 'scaleX(' + progress_ratio + ')';
	player.progress_bar.style.oTransform = 'scaleX(' + progress_ratio + ')';
	player.progress_bar.style.transform = 'scaleX(' + progress_ratio + ')';

	// CURSOR 
    player.cursor_bar.style.left = progress_ratio_percent + '%';
},50);

// CLICK ON PROGRESS BAR
player.seek_bar.addEventListener('click', function(e) {
	var	bounding_rect = player.seek_bar.getBoundingClientRect(),
		 x 			  = e.clientX - bounding_rect.left,
		 ratio 		  = x / bounding_rect.width,
		 time 		  = ratio * player.video.duration;

	player.video.currentTime = time;
});

// // DRAG ON PROGRESS BAR
// player.seek_bar.addEventListener('mousedown', function(e) {
// 	if (!player.video.paused) player.video.pause();
// 	var ratio = (e.clientX - player.container.offsetLeft) / player.seek_bar.offsetWidth;
// 	var current = ratio * player.video.duration;
// 	player.video.currentTime = current;
// 	player.progress_bar.style.webkitTransform = 'scaleX' + ratio + ')';
// 	player.progress_bar.style.mozTransform = 'scaleX' + ratio + ')';
// 	player.progress_bar.style.msTransform = 'scaleX' + ratio + ')';
// 	player.progress_bar.style.oTransform = 'scaleX' + ratio + ')';
// 	player.progress_bar.style.transform = 'scaleX' + ratio + ')';
// 	document.addEventListener('mousemove', dragProgressbar);
// 	document.addEventListener('mouseup', function() {
// 		player.cursor_bar.style.webkitTransform = 'scale(0)';
// 		player.cursor_bar.style.mozTransform = 'scale(0)';
// 		player.cursor_bar.style.msTransform = 'scale(0)';
// 		player.cursor_bar.style.oTransform = 'scale(0)';
// 		player.cursor_bar.style.transform = 'scale(0)';
// 		document.removeEventListener('mousemove', dragProgressbar);
// 		if (compteur_play == 1) {
// 			Pause();
// 		}
		
// 		else if (compteur_play == 2) {
// 			Play();
// 		}
// 	});
// });


/**
*** PLAY / PAUSE PREVIEW
*/
player.video.addEventListener('click', function() {
	if (compteur_play == 1) {
		Play();
		setTimeout(function() {
			compteur_play = 2;
		},200);
	}

	else if (compteur_play == 2) {
		Pause();
		setTimeout(function() {
			compteur_play = 1;
		},200);
	}
		
});

/**
*** BUTTON PLAY
*/

player.button_play.addEventListener('click', function() {
	if (compteur_play == 1) {
		Play();
		setTimeout(function() {
			compteur_play = 2;
		},200);
	}

	else if (compteur_play == 2) {
		Pause();
		setTimeout(function() {
			compteur_play = 1;
		},200);
	}
});


/**
*** HOVER VIDEO 
*/

player.video.addEventListener('mouseover', function() {
	appearControls();
})

player.video.addEventListener('mouseout', function() {
	if (compteur_play == 1) {
		appearControls();
	}	

	else if (compteur_play == 2) {
		removeControls();
	}
	
})

//CONTROLS HOVER
//MOUSE OUT
player.container_controls.addEventListener('mouseout', function() {
	if (compteur_play == 2) {
		removeControls();
	}
		
	else if (compteur_play == 1) {
		appearControls();
	}	
});

//MOUSE IN
player.container_controls.addEventListener('mouseover', function() {
	appearControls();
});


// HOVER PROGRESS BAR
player.seek_bar.addEventListener('mouseover', function() {
	player.cursor_bar.style.webkitTransform = 'scale(1)';
	player.cursor_bar.style.mozTransform = 'scale(1)';
	player.cursor_bar.style.msTransform = 'scale(1)';
	player.cursor_bar.style.oTransform = 'scale(1)';
	player.cursor_bar.style.transform = 'scale(1)';
	player.seek_bar.style.height = '9px';
	player.progress_bar.style.height = '9px';
	player.seek_bar.style.top = '-2px';
});

player.seek_bar.addEventListener('mouseout', function() {
	player.cursor_bar.style.webkitTransform = 'scale(0)';
	player.cursor_bar.style.mozTransform = 'scale(0)';
	player.cursor_bar.style.msTransform = 'scale(0)';
	player.cursor_bar.style.oTransform = 'scale(0)';
	player.cursor_bar.style.transform = 'scale(0)';
	player.seek_bar.style.height = '5px';
	player.progress_bar.style.height = '5px';
	player.seek_bar.style.top = '0px';
});

/**
*** VOLUME 
*/

player.volume_button_container.addEventListener('click', volumeStep);


/**
*** FULLSCREEN 
*/

player.fullScreen_button.addEventListener('click', function() {
	if (compteur_fullscreen == 0) {
		FullScreenIn();
		setTimeout(function() {
    		compteur_fullscreen = 1;
    	},200)
	}

	else if (compteur_fullscreen == 1) {
		FullScreenOut();
		setTimeout(function() {
			compteur_fullscreen = 0;
		},200)
	}
});

/**
*** TIME
*/

setInterval(function() {

	h = parseInt(player.video.currentTime/3600),
    m = parseInt((player.video.currentTime/60)%60),
    s = parseInt(player.video.currentTime%60); 
	
	if (h<10) 
		h='0'+h;
	

	if (m<10) 
		m='0'+m;
	
	if (s<10) 
		s='0'+s;

	player.currentTimeVideo.innerHTML= h+':'+m+':'+s;
	
		h = parseInt(player.video.duration/3600),
		m = parseInt((player.video.duration/60)%60),
		s = parseInt(player.video.duration%60);
	
	if (h<10) 
		h='0'+h;
	
	
	if (m<10) 
		m='0'+m;
	
	
	if (s<10) 
		s='0'+s;

	player.durationVideo.innerHTML= h+':'+m+':'+s;

},100)

var fullscreen;
function onfullscreenchange(full) {
	if (fullscreen == true) {
   		FullScreenIn();
   		console.log('ON');
   	}

    else if (fullscreen == false) {
    	FullScreenOut();
    	console.log('OFF');
    }
}

// You might want to use addEventListener and its equivalents instead
window.onresize = function () {
    if (window.outerWidth === screen.width && window.outerHeight === screen.height) {
        if (!fullscreen) {
            fullscreen = true;
            onfullscreenchange(true);
        }
    } else
        if (fullscreen) {
            fullscreen = false;
            onfullscreenchange(false);
    }
};