/*
*** AUDIO
*/
function audio(audio_name) {
  var container_song          = {};

  container_song.audio        = document.querySelector('audio');

  container_song.audio.volume = 1;
  container_song.audio.src    = 'src/medias/' + audio_name;
}


/*
*** FUNCTION AJAX NORMAL PAGE
*/
function page_ajax(page, trigFunction) {
  var block_page = document.querySelector('.block-page');
  var request = new XMLHttpRequest();
  request.open('GET', '../views/pages/story/' + page + '.twig', true);
  request.onreadystatechange = function() {
    if(this.readyState == 4) {
      block_page.innerHTML = this.responseText;
      trigFunction;
    }
  }
  request.send();
  request = null;
}


/*
*** FUNCTION AJAX PLAYER
*/
function page_ajax_player(page, video_name, switch_page) {
  var block_page = document.querySelector('.block-page');
  var request = new XMLHttpRequest();
  request.open('GET', '../views/pages/story/' + page + '.twig', true);
  request.onreadystatechange = function() {
    if(this.readyState == 4) {
      block_page.innerHTML = this.responseText;
      player(video_name, switch_page);
    }
  }
  request.send();
  request = null;
}


/*
*** FUNCTION AJAX DILEMMA
*/
function page_ajax_dilemma(page, url_left, url_right) {
  var block_page = document.querySelector('.block-page');
  var request = new XMLHttpRequest();
  request.open('GET', '../views/pages/story/' + page + '.twig', true);
  request.onreadystatechange = function() {
    if(this.readyState == 4) {
      block_page.innerHTML = this.responseText;
      // TRIGGER FUNCTION SWIPE
      var left = new onSwipeValid("left",url_left);
      var right = new onSwipeValid("right",url_right);
    }
  }
  request.send();
  request = null;
}


/*
*** TRIGGER DILEMMA ON SPACE TOUCHE
*/
window.addEventListener('keydown', function(e) {
  var key = e.keyCode || e.which;
  switch(key) {

    // SPACE TOUCH
    case 32:
    document.getElementById('human_body').style.opacity="0";
    page_ajax_dilemma('dilemma', 'browse', 'try');
    break;

    // A TOUCH
    case 65:
    var video_one = new page_ajax_player('video', 'video.mp4', 'info_01');

    break;

    // Z TOUCH
    case 90:
    var video_two = new page_ajax_player('video', 'bg_video.mp4', 'info_01');
    break;

    /****************************** EXEMPLE ******************************
    *** POUR TEST VOS PAGES METTEZ VOTRE PAGE
    */
    // E TOUCH
    case 69:
    var votre_page = new page_ajax('story_1');
    break;
  }
});




/*
*** INIT
*/
// PAGE TO LOAD
page_ajax('info_01');
// SONG TO LOAD
var audio_track_01 = new audio('audio.mp3');
var audio_track_02 = new audio('audio2.mp3');


/*
*** SWIPE
*/
function onSwipeValid(direction,page) {

  var that = this;
  that.swipe = {};
  that.swipe.container = document.querySelector('.'+direction+'-choice');

  that.swipe.cursor_signature = document.getElementById('cursor-signature-'+direction);
  that.selected = null, // Object of the element to be moved
  that.x_pos = 0, that.y_pos = 0, // Stores x & y coordinates of the mouse pointer
  that.x_elem = 0, that.y_elem = 0; // Stores top, left values (edge) of the element
  // Will be called when user starts dragging an element

  that._drag_init = function(elem) {
    // Store the object of the element which needs to be moved
    that.selected = elem;
    that.x_elem = that.x_pos - that.selected.offsetLeft;
  }

  // Will be called when user dragging an element
  that.swipe.validation = document.querySelector('#validation-'+direction);
  that.validation_size = parseInt(window.getComputedStyle(that.swipe.validation).getPropertyValue("width").substring(2, -3));
  that.validation_size /= 6.5;
  that.limit = that.swipe.validation.offsetLeft ;

  that._move_elem = function(e) {
    that.x_pos = document.all ? window.event.clientX : e.pageX;
    if (that.selected !== null) {
      var ratio = that.x_pos - that.x_elem;
      if (ratio < 0) {
        ratio = 0;
      } else if (ratio > that.limit) {
        ratio = that.limit + that.validation_size;
        that.swipe.cursor_signature.style.backgroundColor = "green";
        // AJAX REDIRECTION AFTER SWIPE
        page_ajax(page);
      } else if(ratio < 259){
        that.swipe.cursor_signature.style.backgroundColor = "background-color: rgba(79, 136, 255, 1) - #090f1b;";
      }
      that.selected.style.left = ratio + 'px';
    }
  }

  // Destroy the object when we are done
  that._destroy = function() {
    that.selected = null;
  }

  // Bind the functions...
  that.cursor = document.getElementById('cursor-signature-'+direction);
  that.cursor.onmousedown = function () {
    that._drag_init(that.cursor);
    return false;
  };

  this.swipe.container.onmousemove = this._move_elem;
  this.swipe.container.onmouseup = this._destroy;
}
