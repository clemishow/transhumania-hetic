var count = localStorage.getItem('count');
if ($('body').hasClass('browse')) {
    if (count == 0) {
        window.location.href = "http://localhost:9999/transhumania-hetic/web/browse";
        localStorage.setItem('count', 1);
    } 
} else {
    localStorage.setItem('count', 0);
}