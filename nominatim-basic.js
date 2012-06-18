var HOST_URL = 'http://open.mapquestapi.com';

var SAMPLE_POST = HOST_URL + '/nominatim/v1/search?format=json&json_callback=renderBasicSearchNarrative';
var searchType = '';


function showBasicSearchURL() {
    var safe = SAMPLE_POST + "&q=westminster+abbey";
    document.getElementById('divBasicSearchUrl').innerHTML = safe.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

function doBasicSearchClick() {
	var query = document.getElementById('loc').value;
	var limit = 4;
	searchType = "helloworld";
    var newURL = SAMPLE_POST + "&q=" +query;
	if(limit != ""){
		newURL += "&limit=" + limit;
	}
	var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = newURL;
    document.body.appendChild(script);
};

function renderBasicSearchNarrative(response) {
    var html = '';
    var i = 0;
    var j = 0;
	
	if(response){
		
		for(var i =0; i < response.length; i++){
			var result = response[i];
			var resultNum = i+1;			
			
			if(i==0){
				recenter(new OpenLayers.LonLat(result.lon,result.lat));
			}
		}		
	}
	
    switch (searchType) {
		case "helloworld":
			document.getElementById('divBasicSearchResults').style.display = "";
			document.getElementById('divBasicSearchResults').innerHTML = html;
			break;
	}
}

function collapseResults(type) {
	switch(type) {
		case "helloworld":
			document.getElementById('divBasicSearchResults').style.display = "none";
			break;
	}
}
