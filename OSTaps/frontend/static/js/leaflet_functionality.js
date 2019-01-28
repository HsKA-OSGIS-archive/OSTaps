// Create a map.
var LeafletGeoJSON;
var GeoJSON;

function initialiseMap(filename) {

	map = L.map('map', {
					renderer: L.canvas()
					}).setView([51, 10], 6);

	$.getJSON("/get/" + filename, function(geojsonData) {
		GeoJSON = geojsonData;
		LeafletGeoJSON = L.geoJson(GeoJSON).addTo(map);

		var bounds = LeafletGeoJSON.getBounds();
		map.fitBounds(bounds);

		// style geoJSON for the first time (styleGeoJSON.js)
		styleGeoJSON(LeafletGeoJSON);
	});

}
