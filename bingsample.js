var bapiKey = "AnbfFZratnoenvW_aC0Nr2yNdXHCTHuNF2FOJBIKahxTgQ2DNV0tYnMJpGgrqDsw";

var map = new OpenLayers.Map( 'map');

// Bing's Road imagerySet
var road = new OpenLayers.Layer.Bing({
    key: apiKey,
    type: "Road"
});
// Bing's Aerial imagerySet
var aerial = new OpenLayers.Layer.Bing({
    key: apiKey,
    type: "Aerial"
});
// Bing's AerialWithLabels imagerySet
var hybrid = new OpenLayers.Layer.Bing({
    key: apiKey,
    type: "AerialWithLabels",
    name: "Bing Aerial With Labels"
});

map.addLayers([road, aerial, hybrid]);
map.addControl(new OpenLayers.Control.LayerSwitcher());
map.zoomToMaxExtent();

