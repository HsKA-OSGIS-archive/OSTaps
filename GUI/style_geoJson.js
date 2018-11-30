var i_select_line_color;
var defaultColor = "#ff7800";
var defaultWeight  = 2;
var newColor;



function geoJsonstyle(feature) {
	console.log("geoJsonstyle");
	console.log(defaultColor);				
	return {color : defaultColor};
}

// color picker	
window.addEventListener("load", startup, false);

// get default color
function startup() {
	
	console.log("startup");
	i_select_line_color = document.querySelector("#i_select_line_color");
	console.log(i_select_line_color.value);
	//sets the color input's value to the value in defaultColor
	i_select_line_color.value = defaultColor;
	console.log(i_select_line_color.value);
	
	i_select_line_color.addEventListener("input", updateFirst, true);
	i_select_line_color.addEventListener("change", updateAll, true);


}


function updateFirst(event) {
	console.log("updateFirst");
				
}

function updateAll(event) {
	console.log("updateAll");
	// get newColor from colorPicker
	var newColor = document.getElementById("i_select_line_color").value;
	console.log(newColor);
	
	//remove map and add new
	map.removeLayer(L.geoJson);

	L.geoJson(DEU, {style: geoJsonstyleneu}).addTo(map);
	function geoJsonstyleneu(feature) {
		console.log("geoJsonstyleneu");
		console.log(newColor);				
		return {color : newColor};					
	}
}





