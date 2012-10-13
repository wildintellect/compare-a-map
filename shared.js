/** Common functions between all the maps **/

//Bishop, CA
//var startpoint = new OpenLayers.LonLat(-118.3950,37.36390 )
//Davis, CA
var startpoint = new OpenLayers.LonLat(-121.73626,38.55515);

function switchMap(){

    var maplist=document.getElementById("mapList");
    openurl=maplist.options[maplist.selectedIndex].text.toLowerCase()+".html";
    if(openurl != ""){
		window.open(openurl,"_self");
	};


}
