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


