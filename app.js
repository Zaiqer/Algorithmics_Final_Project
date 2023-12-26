var mybutton = document.getElementById("backToTop");

document.onscroll = function() {scrollFunction()};

function scrollFunction() {
 if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    mybutton.style.display = "block";
 } else {
    mybutton.style.display = "none";
 }
}

function backToTopOfPage() {
 document.documentElement.scrollTop = 0;
}
