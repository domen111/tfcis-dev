//Cross browser support
var requestAnimationFrame =
window.requestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.msRequestAnimationFrame;

window.requestAnimationFrame = requestAnimationFrame;

var title;

var title_progress = -1;
var title_text = "";

var entrance_flag = 0;


var	t_flag = 0;

$(document).ready(function(){
	title = document.getElementById("title");

	title_text = title.innerHTML;
	title.innerHTML = "";

	titleAnimation();

});

function replayTitleAnimation(){
	t_flag = 0;
	title_progress = -1;
	titleAnimation();
}

function titleAnimation(){
    if(title_progress <= title_text.length){
        title.innerHTML = "{" + title_text.substring(0, title_progress) + "_}";
        title_progress += 1;
        setTimeout(titleAnimation, 60);
        
    } else {
        setTimeout(function(){
            title.innerHTML = "{" + title_text.substring(0, title_progress) + "}";

            setTimeout(disp_subtitle, 200);

			/* title animation replays*/
			title.addEventListener('mouseover', function(){
				t_flag = 1;
				setTimeout(function(){
					if(t_flag) replayTitleAnimation();
				}, 900);
			});		

			title.addEventListener('mouseout', function(){
				t_flag = 0;
			});
			/* title animation replays*/

        }, 100);
    }
}

function disp_subtitle(){
    document.getElementById("subtitle").innerHTML = "press any key to continue: ";
    $("#subtitle").append('<span id = "cursor" style = "opacity: 1">_</span>');
    
    setInterval(function(){
        document.getElementById("cursor").style.opacity ^= 1;
    	//console.log(document.getElementById("cursor").style.opacity);
	}, 400);
}
