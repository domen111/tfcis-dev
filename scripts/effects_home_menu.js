var menu_items;
var selected_index = 2;

$(document).ready(function(){
	menu_items = document.getElementById("menu").children;
	for(var i = 0; i < menu_items.length; ++i){
		menu_items[i].onmouseover = new Function('e', 'select_menuitem(' + i + ');');
	}
});

$(document).click(function(){
	if(!entrance_flag){
		continue_to();
	}
});

$(document).on("keydown", function(event){
	
	if(entrance_flag){
		//console.log(event);
		if(event.keyCode == 38) {			//UP ARROW
			event.preventDefault();
			select_menuitem((selected_index + menu_items.length - 1) % menu_items.length);

		} else if (event.keyCode == 40){	//DOWN ARROW
			event.preventDefault();
			select_menuitem((selected_index + 1) % menu_items.length);

		} else if (event.keyCode == 13){
			console.log("Display: " + menu_items[selected_index].innerHTML + "...");
		}

	} else {
		continue_to();

	}
});



function continue_to(){
	entrance_flag = 1;

	console.log("continue...");
	$("#subtitle").hide();
	show_menuitem(0);
}

function show_menuitem(i){

	menu_items[i].style.display = "block";
	
	if(menu_items.length > i + 1){
		setTimeout(function(){show_menuitem(i + 1);}, 60);
	} else {
		setTimeout(function(){$(menu_items[selected_index]).addClass("menu-item-selected");}, 600);

		for(var i = 0; i < menu_items.length; ++i){
			addEventListener(menu_items[i], "click", function(){select_menuitem(i);});
		}
	}

}

function select_menuitem(i){
	//console.log(i);
	$(menu_items[selected_index]).removeClass("menu-item-selected");
	$(menu_items[i]).addClass("menu-item-selected");
	selected_index = i;
}
