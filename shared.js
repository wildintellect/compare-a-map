/** Common functions between all the maps **/
/* Compare A Map
Alex Mandel Copyright 2012
tech@wildintellect.com
http://blog.wildintellect.com

Live code can be seen on http://compareamap.org

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

*/

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
