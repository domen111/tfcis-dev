var requestAnimationFrame =

window.requestAnimationFrame || 
window.mozRequestAnimationFrame || 
window.webkitRequestAnimationFrame ||
window.msRequestAnimationFrame;

/*
var transforms = ["transform", 
          "msTransform", 
          "webkitTransform", 
          "mozTransform", 
          "oTransform"];
*/           
//var transformProperty = "transform";//getSupportedPropertyName(transforms);

var mouseDelta = 0;
var mouseScrollActive;

var scrolling;

//Scrolling Handlers
$(document).ready(function(){

    window.addEventListener('scroll', setScroll, false);
    
    window.addEventListener('mousewheel', mouseScroll, false);
    window.addEventListener('DOMMouseScroll', mouseScroll, false);

    animationLoop();

});


//cross-browser position detect
function getScrollPosition() {
    if (document.documentElement.scrollTop == 0) {
        return document.body.scrollTop;
    } else {
        return document.documentElement.scrollTop;
    }
}




function setScroll(e){ scrolling = true; }

function mouseScroll(e){
    e.preventDefault();
    
    mouseScrollActive = true;
    
    // Browser compatibility
    if (e.wheelDelta) {
        mouseDelta = e.wheelDelta / 120;
    } else if (e.detail) {
        mouseDelta = -e.detail / 3;
    }
}


var scrollCount = 0;

function setTranslate3DTransform(element, amount) {
    var value = "translateY(" + amount + "px)";
    element.style.transform = value;
}

function animationLoop(){
    //console.log('animationLoop');
    if (scrolling){
        var fillers = document.getElementsByClassName('parallaxContainer');
        for(var i = 0; i < fillers.length; ++i){
        setTranslate3DTransform(fillers[i],
                        //document.getElementById('parallaxContainer'), 
                        -1 * getScrollPosition() / 2);
        }
        //console.log(document.getElementById('parallaxContainer').style);
        scrolling = false;
    }
    
    if (mouseScrollActive) {
        window.scrollBy(0, -mouseDelta * 10);
        
        ++scrollCount;
        
        if(scrollCount > 10){
            scrollCount = 0;
            mouseDelta = 0;
            mouseScrollActive = false;
        }
    }
    
    requestAnimationFrame(animationLoop);
}
