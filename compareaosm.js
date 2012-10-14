/* Compare A Map OSM js
Alex Mandel Copyright 2012
tech@wildintellect.com
http://blog.wildintellect.com

Live code can be seen on http://compareamap.org

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

*/

OpenLayers.Layer.MapQuestOSM = OpenLayers.Class(OpenLayers.Layer.XYZ, {
name: "MapQuestOSM", //attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>",
sphericalMercator: true,
url: ' http://otile1.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png',
clone: function(obj) {
	if (obj == null) {
		obj = new OpenLayers.Layer.OSM(
		this.name, this.url, this.getOptions());
	     }
	     obj = OpenLayers.Layer.XYZ.prototype.clone.apply(this, [obj]);
	     return obj;
	 },
	 CLASS_NAME: "OpenLayers.Layer.MapQuestOSM"
 });


var map1, map2, map3, map4, map5; 
var osm,mapquest,road,aerial,hybrid, yahooLayer;
var options, external_panel;
var wgscenter;
var test;

function init(){
	
	master = {

        controls:[ 
				   //external_panel,
				   new OpenLayers.Control.Navigation(),
                   //new OpenLayers.Control.PanZoomBar(),
                   //new OpenLayers.Control.ScaleLine(),
                   //new OpenLayers.Control.MousePosition(),
				  ],
		projection: new OpenLayers.Projection("EPSG:900913"),
		displayProjection: new OpenLayers.Projection("EPSG:4326"),
		maxExtent: new OpenLayers.Bounds(
		-20037508, -20037508, 20037508, 20037508.34)
	}

	options = {
        controls:[ //external_panel,
				   new OpenLayers.Control.Navigation(),
                   //new OpenLayers.Control.PanZoomBar(),
                   //new OpenLayers.Control.ScaleLine(),
                   //new OpenLayers.Control.MousePosition(),        
				  ],
		projection: new OpenLayers.Projection("EPSG:900913"),
		displayProjection: new OpenLayers.Projection("EPSG:4326"),
		maxExtent: new OpenLayers.Bounds(
		-20037508, -20037508, 20037508, 20037508.34)
	}

	options1 = {
        controls:[ //external_panel,
				   new OpenLayers.Control.Navigation(),
                   //new OpenLayers.Control.PanZoomBar(),
                   //new OpenLayers.Control.ScaleLine(),
                   //new OpenLayers.Control.MousePosition(),        
				  ],
		projection: new OpenLayers.Projection("EPSG:4326"),
		displayProjection: new OpenLayers.Projection("EPSG:4326"),
		//maxExtent: new OpenLayers.Bounds(
	//	-20037508, -20037508, 20037508, 20037508.34)
	}
	var bapiKey = "AnbfFZratnoenvW_aC0Nr2yNdXHCTHuNF2FOJBIKahxTgQ2DNV0tYnMJpGgrqDsw";		
//Maps
map1 = new OpenLayers.Map( 'map1',options);
map2 = new OpenLayers.Map( 'map2',options);
map3 = new OpenLayers.Map( 'map3',options);
map4 = new OpenLayers.Map( 'map4',options);
map5 = new OpenLayers.Map( 'map5',options);

	//var external_control = new OpenLayers.Control.PanZoomBar({
//	div: document.getElementById('external_control') });

	//map1.addControl(external_control);
	//map1.addControl = external_panel;

//Layers
	osm = new OpenLayers.Layer.OSM( "Simple OSM Map");
	mapquest = new OpenLayers.Layer.MapQuestOSM("Mapquest OSM");
	
    var watercolor = new OpenLayers.Layer.XYZ(
    "Water Color",
    ["http://169.237.167.64/tilestache/watercolor/${z}/${x}/${y}.png"],
    {wrapDateLine: true, enabled:false,
    buffer: 1,numZoomLevels: 16, minZoom:4,
    isBaseLayer:true,sphericalMecator:true}
    );

    var toner = new OpenLayers.Layer.XYZ(
    "Toner",
    ["http://a.tile.stamen.com/toner/${z}/${x}/${y}.png",
     "http://b.tile.stamen.com/toner/${z}/${x}/${y}.png"],
    {wrapDateLine: true, visibility:false,
    buffer: 1,numZoomLevels: 18, minZoom:4,
    isBaseLayer:true,sphericalMecator:true}
    );

    var terrain = new OpenLayers.Layer.XYZ(
    "Terrain",
    ["http://a.tile.stamen.com/terrain/${z}/${x}/${y}.png",
     "http://b.tile.stamen.com/terrain/${z}/${x}/${y}.png"],
    {wrapDateLine: true, visibility:false,
    buffer: 1,numZoomLevels: 18, minZoom:4,
    isBaseLayer:true,sphericalMecator:true}
    );
    
    var cycle = new OpenLayers.Layer.OSM(
        "OpenCyclemapMap",
        "http://tile.opencyclemap.org/cycle/${z}/${x}/${y}.png",
    {wrapDateLine: true, visibility:false,
    buffer: 1,numZoomLevels: 18, minZoom:4,
    isBaseLayer:true,sphericalMecator:true}
    );
    
	map1.addLayer(osm);
	map2.addLayer(toner);
	map3.addLayer(mapquest);
	map4.addLayer(cycle);
	map5.addLayer(watercolor);

	center =  startpoint.transform(
	new OpenLayers.Projection("EPSG:4326"),
	map1.getProjectionObject());           
	map1.setCenter(center,12);
	map2.setCenter(center,12);
	map3.setCenter(center,12);
	map4.setCenter(center,12);
	map5.setCenter(center,12);

	map1.events.register('moveend',map1,sync)
	map2.events.register('moveend',map2,sync)
	map3.events.register('moveend',map3,sync)
	map4.events.register('moveend',map4,sync)
	map5.events.register('moveend',map5,sync)
	
	map1.events.register('zoomend',map1,sync)
	
}

function sync(test){
	
		var sphm_center = this.getExtent().getCenterLonLat();
		var newcenter = this.getExtent().getCenterLonLat().transform(
        map1.getProjectionObject(),new OpenLayers.Projection("EPSG:4326"));
	var newzoom = map1.getZoomForResolution(map1.getResolution());			
	map1.setCenter(sphm_center, newzoom);			
	map2.setCenter(sphm_center, newzoom);
	map3.setCenter(sphm_center, newzoom);
	map4.setCenter(sphm_center, newzoom);
	map5.setCenter(sphm_center, newzoom);

	test=0;
}

function syncWGS(){
	//var sphmr_center = this.getExtent().getCenterLonLat().transform(
 //new OpenLayers.Projection("EPSG:4326"),map1.getProjectionObject());
	//map1.setCenter(sphmr_center, map1.getZoomForResolution(map1.getResolution()));
	sync(1);			
	//map2.setCenter(sphmr_center, this.getZoomForResolution(map1.getResolution()));
	//map3.setCenter(sphmr_center, this.getZoomForResolution(map1.getResolution()));
	//map4.setCenter(sphmr_center, this.getZoomForResolution(map1.getResolution()));
	//map5.setCenter(newcenter, this.getZoomForResolution(map5.getResolution()));
}

function recenter(wgscenter){
	map5.setCenter(wgscenter,10);
	map5.setCenter(wgscenter,12);
	var sphmr_center = wgscenter.transform(
	new OpenLayers.Projection("EPSG:4326"),map1.getProjectionObject());
	map1.setCenter(sphmr_center,12);
		
}

/*JQuery Section*/
$(function() {
	$( "#slider" ).slider({
		value:12,
		min: 0,
		max: 16,
		step: 1,
		slide: function( event, ui ) {
			$( "#zoom" ).val(ui.value );
			map1.setCenter(map1.getExtent().getCenterLonLat(),ui.value);
		}
	});
	$( "#zoom" ).val($( "#slider" ).slider( "value" ) );
});

function outsideMap(site) {

	var openurl ="none"
	var center = map1.getExtent().getCenterLonLat().transform(
        map1.getProjectionObject(),new OpenLayers.Projection("EPSG:4326"));
//	if(site=="osm"){
//		alert("works");
//	};
	switch(site){
		case "osm":
			//http://www.openstreetmap.org/?lat=38.5368&lon=-121.7588&zoom=14&layers=M
			openurl="http://www.openstreetmap.org/?lat="+center.lat+"&lon="+center.lon+"&zoom="+map1.zoom+"&layers=M";
			break;
		case "google":
			//https://maps.google.com/?ie=UTF8&ll=39.368279,-116.916504&spn=8.965981,19.753418&t=m&z=6&vpsrc=6
			openurl="http://maps.google.com/?ie=UTF8&ll="+center.lat+","+center.lon+"&z="+map1.zoom+"&t=m";
			break;
		case 'mapquest':
			//http://mapq.st/?center=39.6133,-105.016098&zoom=8
			openurl="http://open.mapquest.com/?center="+center.lat+","+center.lon+"&zoom="+map1.zoom+"";
			break;		
		case 'toner':
    //http://maps.stamen.com/toner/#/12/37.7706/-122.3782
			openurl="http://maps.stamen.com/toner/#"+map1.zoom+"/"+center.lat+"/"+center.lon;
			break;
		case 'watercolor':
            //http://maps.stamen.com/watercolor/#12/37.7706/-122.3782
			openurl="http://maps.stamen.com/watercolor/#"+map1.zoom+"/"+center.lat+"/"+center.lon;
			break;
		case 'none':
			openurl = "";		
	};
	//alert(openurl);
	
	if(openurl != ""){
		window.open(openurl);
		};
}
