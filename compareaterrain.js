/* Compare A Map Terrain js
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


//Layers
	osm = new OpenLayers.Layer.OSM( "Simple OSM Map");
	mapquest = new OpenLayers.Layer.MapQuestOSM("Mapquest OSM");
	mapqair = new OpenLayers.Layer.XYZ("Mapquest Air",
		["http://oatile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
		"http://oatile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
		"http://oatile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
		"http://oatile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg"]
		,{wrapDateLine: true, visibility:false,
//buffer: 1,numZoomLevels: 18, minZoom:4,
isBaseLayer:true,sphericalMecator:true}
	);
	// Bing's Road imagerySet
	var road = new OpenLayers.Layer.Bing({
		key: bapiKey,
		type: "Road"
	});
	// Bing's Aerial imagerySet
	var aerial = new OpenLayers.Layer.Bing({
		key: bapiKey,
		type: "Aerial"
	});
	// Bing's AerialWithLabels imagerySet
	var hybrid = new OpenLayers.Layer.Bing({
		key: bapiKey,
		type: "AerialWithLabels",
		name: "Bing Aerial With Labels"
	});
	var gsat = new OpenLayers.Layer.Google(
		"Google Satellite",
		{type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
	);
	var gphy = new OpenLayers.Layer.Google(
		"Google Physical",
		{type: google.maps.MapTypeId.TERRAIN, visibility: false}
	);
	var gmap = new OpenLayers.Layer.Google(
		"Google Streets", // the default
		{numZoomLevels: 20, visibility: false}
	);
	var ghyb = new OpenLayers.Layer.Google(
		"Google Hybrid",
		{type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22, visibility: false}
	);
	var yahooLayer = new OpenLayers.Layer.Yahoo( "Yahoo");
	var yahoosat = new OpenLayers.Layer.Yahoo(
        "Yahoo Satellite",
        {'type': YAHOO_MAP_SAT, 
	  //sphericalMercator: true
	  }
    	);
    var usgsNAIP = new OpenLayers.Layer.WMS("NAIP",
        "http://raster.nationalmap.gov/ArcGIS/services/Orthoimagery/USGS_EDC_Ortho_NAIP/ImageServer/WMSServer?",
        {layers:'0',isBaseLayer:true,//sphericalMercator:true
        }
    );
    
    var terrain = new OpenLayers.Layer.XYZ(
        "Terrain",
        ["http://a.tile.stamen.com/terrain/${z}/${x}/${y}.png",
        "http://b.tile.stamen.com/terrain/${z}/${x}/${y}.png"],
    {wrapDateLine: true, visibility:false,
    buffer: 1,numZoomLevels: 18, minZoom:0,
    isBaseLayer:true,sphericalMecator:true}
    );
    
    var toposm = new OpenLayers.Layer.XYZ(
        "TopOSM",
        ["http://a.tile.stamen.com/toposm-color-relief/${z}/${x}/${y}.png",
        "http://b.tile.stamen.com/toposm-color-relief/${z}/${x}/${y}.png",
        "http://c.tile.stamen.com/toposm-color-relief/${z}/${x}/${y}.png",
        "http://d.tile.stamen.com/toposm-color-relief/${z}/${x}/${y}.png"],
        {wrapDateLine: true, visibility:false,
        numZoomLevels: 16, minZoom:0,
        isBaseLayer:true,//sphericalMecator:true
        }
    );
    
    var toposmfeature = new OpenLayers.Layer.XYZ(
        "TopOSM Overlay",
        ["http://c.tile.stamen.com/toposm-features/${z}/${x}/${y}.png",
        "http://d.tile.stamen.com/toposm-features/${z}/${x}/${y}.png",
        "http://a.tile.stamen.com/toposm-features/${z}/${x}/${y}.png",
        "http://b.tile.stamen.com/toposm-features/${z}/${x}/${y}.png"],
         {wrapDateLine: true, visibility:false,
    buffer: 1,numZoomLevels: 16, minZoom:0,
    isBaseLayer:false//,sphericalMecator:true
    }
    );
    
    var toposmcontour = new OpenLayers.Layer.XYZ(
        "TopOSM Contours",
        ["http://a.tile.stamen.com/toposm-contours/${z}/${x}/${y}.png",
        "http://b.tile.stamen.com/toposm-contours/${z}/${x}/${y}.png",
        "http://c.tile.stamen.com/toposm-contours/${z}/${x}/${y}.png",
        "http://d.tile.stamen.com/toposm-contours/${z}/${x}/${y}.png"],
         {//wrapDateLine: true, visibility:false,
    buffer: 1,numZoomLevels: 16, minZoom:0,
    isBaseLayer:false//,sphericalMecator:true
    }
    );
    
    var cyclelandscape = new OpenLayers.Layer.XYZ(
        "OpenCyclemapMap",
        "http://tile3.opencyclemap.org/landscape/${z}/${x}/${y}.png",
    {wrapDateLine: true, visibility:false,
    buffer: 1,numZoomLevels: 18, minZoom:4,
    isBaseLayer:true,sphericalMecator:true}
    );
    
     var natgeo = new OpenLayers.Layer.XYZ( 
        "National Geographic",
        'http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/${z}/${y}/${x}.jpg',
        {numZoomLevels: 16,
        isBaseLayer:true,//sphericalMecator:true
        }
    );
     



    //var MAX_RESOLUTION = 3276.8
    //var LAYER_EXTENT = new OpenLayers.Bounds( -256 * MAX_RESOLUTION, 1024 * MAX_RESOLUTION, 256 * MAX_RESOLUTION, 1536 * MAX_RESOLUTION)
    //var sps = new OpenLayers.Layer.XYZ("SPS",
	//    "http://tiles.closedcontour.com/sps/v2/${z}/${x}/${y}.jpg",
	//{
		//maxExtent: LAYER_EXTENT,
		//maxResolution: MAX_RESOLUTION / 4,
		//numZoomLevels: 9,
		//projection: "SPS.CLOSEDCONTOUR.COM",
		//units: "m",
	//}
    //);
    
    //Must alias 900913 to 3875 for usgs naip to work
    aliasproj = new OpenLayers.Projection("EPSG:3857");
    usgsNAIP.projection = aliasproj;

	map1.addLayer(terrain);
	map2.addLayer(gphy);
	map3.addLayer(cyclelandscape);
	map4.addLayer(toposm);
	//map4.addLayer(toposmfeature);
    map4.addLayer(toposmcontour);
    map5.addLayer(natgeo);    

	center =  startpoint.transform(new OpenLayers.Projection("EPSG:4326"), map1.getProjectionObject());           
	map1.setCenter(center,12);
	map2.setCenter(center,12);
	map3.setCenter(center,12);
	map4.setCenter(center,12);
	map5.setCenter(center,12);

	map1.events.register('moveend',map1,sync);
	map2.events.register('moveend',map2,sync);
	map3.events.register('moveend',map3,sync);
	map4.events.register('moveend',map4,sync);
    map5.events.register('moveend',map5,sync);
		
	map1.events.register('zoomend',map1,sync);
	
}

function sync(test){
	if(test==1){
		var sphm_center = map5.getExtent().getCenterLonLat().transform(
        new OpenLayers.Projection("EPSG:4326"),map1.getProjectionObject());
		var newcenter = map5.getExtent().getCenterLonLat();
		}
	else{
		var sphm_center = this.getExtent().getCenterLonLat();
		var newcenter = this.getExtent().getCenterLonLat().transform(
        map1.getProjectionObject(),new OpenLayers.Projection("EPSG:4326"));
		}
	var newzoom = map1.getZoomForResolution(map1.getResolution());			
	map1.setCenter(sphm_center, newzoom);			
	map2.setCenter(sphm_center, newzoom);
	map3.setCenter(sphm_center, newzoom);
	map4.setCenter(sphm_center, newzoom);
    map5.setCenter(sphm_center, newzoom);
	test=0;
}

function recenter(wgscenter){
	//map5.setCenter(wgscenter,10);
	//map5.setCenter(wgscenter,12);
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
		case "stamenT":
        //http://maps.stamen.com/terrain/#12/37.7706/-122.3782
			openurl="http://maps.stamen.com/terrain/#"+map1.zoom+"/"+center.lat+"/"+center.lon;
			break;
		case "googlephy":
			//https://maps.google.com/?ie=UTF8&ll=39.368279,-116.916504&spn=8.965981,19.753418&t=m&z=6&vpsrc=6
			openurl="http://maps.google.com/?ie=UTF8&ll="+center.lat+","+center.lon+"&z="+map1.zoom+"&t=p";
			break;
		case 'ocmland':
			//http://www.opencyclemap.org/?zoom=6&lat=53.8&lon=-1.85&layers=00B
			openurl="http://www.opencyclemap.org/?lat="+center.lat+"&lon="+center.lon+"&zoom="+map1.zoom+"&layers=00B";
			break;
		case 'toposm':
			//http://www.toposm.com/us/index.html?zoom=8&lat=39.25&lon=-98&layers=B0
			openurl="http://www.toposm.com/us/index.html?&zoom="+map1.zoom+"&lat="+center.lat+"&lon="+center.lon+"&layers=B0TF";
			break;
        case 'natgeo':
			//?
			openurl="http://www.arcgis.com/home/item.html?id=b9b1b422198944fbbd5250b3241691b6";
			break;
		case 'none':
			openurl = "";		
	};
	//alert(openurl);
	
	if(openurl != ""){
		window.open(openurl);
		};
}
