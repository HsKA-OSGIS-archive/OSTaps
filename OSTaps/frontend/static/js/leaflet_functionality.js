// Create a map.
var ourGeoJSON;

function initialiseMap(filename) {
	
	var map = L.map("map").setView([51, 10], 6);
	
	console.log(filename)
		
	$.getJSON("http://localhost:8000/get/" + filename, function(geojsonData) {
		ourGeoJSON = L.geoJson(geojsonData).addTo(map);
		
		var bounds = ourGeoJSON.getBounds();
		map.fitBounds(bounds);
		
		// style geoJSON for the first time (styleGeoJSON.js)
		styleGeoJSON(ourGeoJSON);
	});
	
}
