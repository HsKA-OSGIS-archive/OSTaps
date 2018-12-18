$(document).ready(function(){
	var template =
	`
	<!DOCTYPE html>
	<html>

	  <head>
		<meta charset=\"utf-8\">
		<title>OSM</title>
	  
		<!-- Leaflet -->
		<link rel=\"stylesheet\" href=\"https://unpkg.com/leaflet@1.3.4/dist/leaflet.css\" integrity=\"sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==\" crossorigin=\"\"/>
		<script src=\"https://unpkg.com/leaflet@1.3.4/dist/leaflet.js\" integrity=\"sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA==\" crossorigin=\"\"></script>
		
		<style>#map {width: 1000px; height: 700px;}</style>
		
	  </head>

	  <body>	
		<div id=\"map\">
		</div>
	  </body> 

	</html>

	<script>	
	var map = new L.Map(\'map\', {
	});

	var baseMaps = {
		\'Satellit (Google)\': L.tileLayer(\'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}\',{
			maxZoom: 20,
			subdomains:[\'mt0\',\'mt1\',\'mt2\',\'mt3\']
		}),
	};
	baseMaps[\'Satellit (Google)\'].addTo(map);
	map.setView([0,0], 2);
	</script>

	`

	function download(filename, text) {
	  var element = document.createElement('a');
	  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	  element.setAttribute('download', filename);

	  element.style.display = 'none';
	  document.body.appendChild(element);

	  element.click();

	  document.body.removeChild(element);
	}

	$( "#target" ).click(function() {
		download("StyledLeaflet.html", template);
	});
});


