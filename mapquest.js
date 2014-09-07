10:     sphericalMercator: true,
11:     url: ' http://otile1.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png',
12:     clone: function(obj) {
13:         if (obj == null) {
14:             obj = new OpenLayers.Layer.OSM(
15:             this.name, this.url, this.getOptions());
16:         }
17:         obj = OpenLayers.Layer.XYZ.prototype.clone.apply(this, [obj]);
18:         return obj;
19:     },
20:     CLASS_NAME: "OpenLayers.Layer.MapQuestOSM"
21: });
22:     
23: var mapquestosm = new OpenLayers.Layer.MapQuestOSM();


