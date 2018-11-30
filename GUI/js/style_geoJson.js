// GUI elements
var i_select_line_color;

// default values, will be overwritten by user defined values
var outlineColor = "#ff7800";
var fillColor = "#777777";
var weight  = 2;

// everything is based on this styleGeoJSON function
// INPUTS:
// - geoJSON2style: the L.geoJson object created in the html file 
// - outlineColor: 	outline color of the polygons (default value is the default color)
//					-> can be changed by the user using color chooser
// - fillColor:		fill color of the polygons (default value is the default color)
//					-> will be styled by color brewer
// - ....

function styleGeoJSON(geoJSON2style) {
	geoJSON2style.eachLayer(function(feature) {
		feature.setStyle({
			color: outlineColor,
			fillColor: fillColor
		});
	});
}

// call the startup function when the document has finished loading:
window.addEventListener("load", startup, false);

// the startup function which will be called when the page is loaded
// this function does the following:
// 1. Style the GeoJSON with the default values
// 2. Register all user inputs from the GUI and add Event listeners
function startup() {
	console.log("startup");
	
	// style geoJSON for the first time
	styleGeoJSON(ourGeoJSON);
	
	// ----------------------
	// REGISTER COLOR CHOOSER
	// get the color chooser
	i_select_line_color = document.querySelector("#i_select_line_color");
	
	console.log("Default value of color chooser");
	console.log(i_select_line_color.value);
	
	// overwrites the default color by a nicer color defined by us (outlineColor)
	i_select_line_color.value = outlineColor;
	console.log("This is the new default value of the color chooser");
	console.log(i_select_line_color.value);
	
	// add listener to check if color is changed by the user
	i_select_line_color.addEventListener("change", updateOutlineColor, true);
	
	//------------------------
	// REGISTER NEXT GUI ELEMENT
	// ....
}

// ------------------------------------------------
// HANDLE EVENTS AND UPDATE STYLE WITH NEW VALUES:

// OUTLINE COLOR:
function updateOutlineColor(event) {
	// get newColor from colorPicker
	outlineColor = i_select_line_color.value;
	console.log("New color choosen from user:");
	console.log(outlineColor);
	
	styleGeoJSON(ourGeoJSON);
}

// HANDLE NEXT ELEMENT
// .....






