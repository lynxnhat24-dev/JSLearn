var section = document.querySelectorAll(".section");
var sections = {};
console.log(sections);
var i = 0;

Array.prototype.forEach.call(section, function (e) {
    sections[e.id] = e.offsetTop;
});

window.onscroll = function () {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    for (i in sections) {
        if (sections[i] <= scrollPosition) {
            document.querySelector('.active').setAttribute('class', ' ');
            document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');
        }
    }
};

$(document).ready(function(){
    $("#btnmenu").click(function(e){
        e.preventDefault();
        $('#menutop').slideToggle(500,"linear");
    })
})