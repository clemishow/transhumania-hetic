var request = new XMLHttpRequest();
request.open('GET', 'story?direction=left', true);
request.onreadystatechange = function() {
  if(this.readyState == 4) {
    console.log('ok');
  }
}
request.send("direction=left");
request = null;
/*
*** AUDIO
*/
function audio(audio_name) {
  var song              = {};

  song.container        = document.querySelector('.audio-controller');
  song.audio            = song.container.querySelector('audio');

  song.audio.volume     = 0; // OFF SOUND
  song.audio.src        = 'src/medias/' + audio_name;
}


/*
*** VOICE
*/
function voice(audio_name) {
  var voice              = {};

  voice.container        = document.querySelector('.voice-controller');
  voice.audio            = voice.container.querySelector('audio');

  voice.audio.volume     = 0; // OFF SOUND
  voice.audio.src        = 'src/medias/voices/' + audio_name;
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
      var container_btn_next = document.querySelector('.container-btn-next');
      
        container_btn_next.addEventListener('click', function(){
          
          // IF INFO 1
          if (page == 'info_01_pacemaker') {
            var dilemma_01 = new page_ajax_dilemma('dilemma_01_pacemaker','dilemma_02_pacemaker','info_02_pacemaker');
            var voice_track_02 = new voice('03-Pacemaker.wav');
          } 

          // IF INFO 2
          else if (page == 'info_02_pacemaker') {
            var dilemma_02 = new page_ajax('info_03_prosthetics');
            var voice_track_02 = new voice('none');
          }

          // IF INFO 3
          else if (page == 'info_03_prosthetics') {
            var dilemma_03 = new page_ajax_dilemma('dilemma_03_prosthetics','info_05_implants','info_04_prosthetics');
            var voice_track_05 = new voice('06-Prothese_01.wav');
          }

          // IF INFO 4
          else if (page == 'info_04_prosthetics') {
            var dilemma_04 = new page_ajax_dilemma('dilemma_04_prosthetics','info_05_implants','info_05_implants');
            var voice_track_06 = new voice('07-Prothese_02.wav');
          }

          // IF INFO 5
          else if (page == 'info_05_implants') {
            var dilemma_05 = new page_ajax_dilemma('dilemma_05_implants', 'info_06_memory', 'info_06_memory');
            var voice_track_07 = new voice('08-Implants.wav');
          }

          // IF INFO 6
          else if (page == 'info_06_memory') {
            var dilemma_06 = new page_ajax_dilemma('dilemma_06_memory', 'info_07_ia', 'info_07_ia');
            var voice_track_08 = new voice('10-Stockage.wav');
          }

          // IF INFO 7
          else if (page == 'info_07_ia') {
            var dilemma_07 = new page_ajax_dilemma('dilemma_07_ia', 'info_08_cells', 'info_08_cells');
            var voice_track_09 = new voice('11-IA.wav');
          }

          // IF INFO 8
          else if (page == 'info_08_cells') {
            var dilemma_08 = new page_ajax_dilemma('dilemma_08_cells', 'end_01', 'end_02');
            var voice_track_09 = new voice('12-Immortalite.wav');
          }

        });
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
      var left = new onSwipeValid('left',url_left);
      var right = new onSwipeValid('right',url_right);
    }
  }
  request.send();
  request = null;
}



/*
*** INIT
*/

// PAGE TO LOAD
var video_intro = new page_ajax_player('video', 'video.mp4', 'info_01_pacemaker');




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
        if (direction == 'left') {
          var request = new XMLHttpRequest();
          request.open('GET', 'http://localhost:9999/transhumania-hetic/web/story?direction=left', true);
          request.onreadystatechange = function() {
            if(this.readyState == 4) {
              console.log('ok');
            }
          }
          request.send("direction=left");
          request = null;
        } else {
          var request = new XMLHttpRequest();
          request.open('GET', 'http://localhost:9999/transhumania-hetic/web/story?direction=right', true);
          request.onreadystatechange = function() {
            if(this.readyState == 4) {
              console.log('ok');
            }
          }
          request.send("direction=right");
          request = null;
        }
        page_ajax(page);
        var choice = page;

          // IF CHOICE DILEMMA
          if (choice == 'info_02_pacemaker') {
            var voice_track_03 = new voice('05-Succes_pacemaker.wav');
          } 

          // IF DILEMMA 2
          else if (choice == 'dilemma_02_pacemaker') {
            var voice_track_04 = new voice('04-Risques_pacemaker.wav');
            var dilemma_02 = new page_ajax_dilemma('dilemma_02_pacemaker','info_03_prosthetics','info_02_pacemaker');
          } 

          // IF PAGE INFO : CUT VOICE 
          else if (choice == 'info_05_implants' || choice == 'info_04_prosthetics' || choice == 'info_06_memory' || choice == 'info_03_prosthetics' || choice == 'info_04_prosthetics' || choice == 'info_01_pacemaker' || choice == 'info_02_pacemaker' || choice == 'info_07_ia' || choice == 'info_08_cells' || choice == 'end_01' || choice == 'end_02') {
            var voice_track_08 = new voice('none');
          } 

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
