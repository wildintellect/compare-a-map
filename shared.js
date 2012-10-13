/** Common functions between all the maps **/

function switchMap(){

    var maplist=document.getElementById("mapList");
    openurl=maplist.options[maplist.selectedIndex].text+".html";
    if(openurl != ""){
		window.open(openurl,"_self");
	};


}
