// // REFRESH BROWSE PAGE TO DELETE CODE VARIABLE IN URL
// var count = localStorage.getItem('count');
// if ($('body').hasClass('begin')) {
//     if (count == 0) {
//         window.location.href = "http://localhost:9999/transhumania-hetic/web/begin";
//         localStorage.setItem('count', 1);
//     }
// } else {
//     localStorage.setItem('count', 0);
// }

// STORY PAGE
var button_panel = document.querySelector('#panel-button');
var panel = document.querySelector('#panel');
var overlay = document.querySelector('.overlay');
button_panel.addEventListener("click",function(){
if (panel.classList.contains("active")) {
  panel.classList.remove("active");
  overlay.classList.remove("active");
} else {
  panel.classList.add("active");
  overlay.classList.add("active");
}
});
window.addEventListener("keydown",function(event){
if (event.which == 40 && panel.classList.contains("active")) {
  panel.classList.remove("active");
  overlay.classList.remove("active");
} else if (event.which == 38 && panel.classList.contains("active") == false){
  panel.classList.add("active");
  overlay.classList.add("active");
}
});

// FULLSCREEN NATIF
var count_fullScreen = 0;
function FullScreenIn() {
  document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;

  function requestFullscreen(document) {
      if (document.requestFullscreen) {
          document.requestFullscreen();
      } else if (document.mozRequestFullScreen) {
          document.mozRequestFullScreen();
      } else if (document.webkitRequestFullScreen) {
          document.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
  }

  function cancelFullscreen(document) {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
  }
  console.log(count_fullScreen);
  if (count_fullScreen == 0) {
        requestFullscreen(document.documentElement);
        setTimeout(function(){
          count_fullScreen = 1;
          console.log(count_fullScreen);
        },300);
  } else if (count_fullScreen == 1) {
        cancelFullscreen(document);
        setTimeout(function(){
          count_fullScreen = 0;
        },300);
  }
}


function player(video_name, switch_page) {
  var  player                    = {};

  // GENERAL
  player.container               = document.querySelector('.player');
  player.video                   = player.container.querySelector('video');
  player.container_controls      = player.container.querySelector('.controls');
  // PROGRESS BAR
  player.seek_bar                = player.container.querySelector('.seek-bar');
  player.cursor_bar              = player.container.querySelector('.cursor-bar');
  player.progress_bar            = player.container.querySelector('.progress-bar');
  // BUTTON
  player.volume                  = document.querySelector('.volume-btn');
  var video_name                 = 'src/medias/' + video_name;
  player.video.src               = video_name;


  player.video.volume = 0;

  // PLAY
  function play() {
    player.video.play();
  }

  // PAUSE
  function pause() {
    player.video.pause();
  }

  /**
  *** SEEK BAR
  */
  window.setInterval(function(){
    var progress_ratio      = player.video.currentTime / player.video.duration,
      progress_ratio_percent  = progress_ratio * 100;

    // PROGRESS BAR
    player.progress_bar.style.webkitTransform = 'scaleX(' + progress_ratio + ')';
    player.progress_bar.style.mozTransform = 'scaleX(' + progress_ratio + ')';
    player.progress_bar.style.msTransform = 'scaleX(' + progress_ratio + ')';
    player.progress_bar.style.oTransform = 'scaleX(' + progress_ratio + ')';
    player.progress_bar.style.transform = 'scaleX(' + progress_ratio + ')';

    // CURSOR
      player.cursor_bar.style.left = progress_ratio_percent + '%';
      video_switch = (player.video.currentTime) >= (player.video.duration-0.1);
      if (video_switch) {
        player.video.currentTime = 0;
        pause();
        page_ajax(switch_page);
      }
  },50);

  // CLICK ON PROGRESS BAR
  player.seek_bar.addEventListener('click', function(e) {
    var bounding_rect = player.seek_bar.getBoundingClientRect(),
       x        = e.clientX - bounding_rect.left,
       ratio      = x / bounding_rect.width,
       time       = ratio * player.video.duration;

    player.video.currentTime = time;
  });

  player.video.addEventListener('loadeddata', function() {
      // VIDEO LOAD
  }, false);
}

/*
*** AUDIO VOLUME
*/

function volume_audio() {
  var audio   = document.querySelector('.audio-controller audio');
  var voice   = document.querySelector('.voice-controller audio');
  if (audio.volume == 1 && voice.volume == 1) {
    audio.volume = 0;
    voice.volume = 0;
  } else if (audio.volume == 0 && voice.volume == 0) {
    audio.volume = 1;
    voice.volume = 1;
  }
}

var volume_btn   = document.querySelector('.volume-btn');
volume_btn.addEventListener('click', function(){
  volume_audio();
});
