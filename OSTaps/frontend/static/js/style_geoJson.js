// GUI elements
var i_select_line_color;
var f_select_line_width;
var s_select_line_style;

// default values, will be overwritten by user defined values
var outlineColor = "#4B8A08";
var fillColor = "#777777";
var lineWidth  = 2 ;
var outlineStyle;

//given outline styles
var ssolid = "";
var sdashed = "15,10";
var sdotted = "1,10";


// everything is based on this styleGeoJSON function
// INPUTS:
// - geoJSON2style: the L.geoJson object
// - outlineColor: 	outline color of the polygons (default value is the default color)
//					-> can be changed by the user using color chooser
// - fillColor:		fill color of the polygons (default value is the default color)
//					-> will be styled by color brewer
// - ....

function styleGeoJSON(geoJSON2style) {
	geoJSON2style.eachLayer(function(feature) {
		feature.setStyle({
			color: outlineColor,
			fillColor: fillColor,
			weight: lineWidth,
			dashArray: outlineStyle,
            // lineJoin: 'round'
		});
	});
}

// call the startup function when the document has finished loading:
window.addEventListener("load", startup, false);

// the startup function which will be called when the page is loaded
// this function does the following:
// 1. Register all user inputs from the GUI and add Event listeners
function startup() {

	// ----------------------
	// REGISTER COLOR CHOOSER
	// get the color chooser
	i_select_line_color = document.querySelector("#i_select_line_color");
	f_select_line_width = document.querySelector("#select_line_width");
	s_select_line_style = document.querySelector("#s_select_line_style");
			
	// overwrites the default color by a nicer color defined by us (outlineColor)
	i_select_line_color.value = outlineColor;	
	f_select_line_width.value = lineWidth;	
	s_select_line_style.value = outlineStyle;
	
	// add listener to check if color is changed by the user
	i_select_line_color.addEventListener("change", updateOutlineColor, true);
	// add listener to check if line width is changed by the user
	f_select_line_width.addEventListener("change", updateLineWidth, true);
	// add listener to check if line style is changed by the user
	s_select_line_style.addEventListener("change", updateLineStyle, true);
	
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
	
	styleGeoJSON(LeafletGeoJSON);
}

// OUTLINE WIDTH
function updateLineWidth(event) {
	// get lineWidth 
	lineWidth = f_select_line_width.value;
	console.log("New width choosen from user:");
	console.log(lineWidth);
	
	styleGeoJSON(LeafletGeoJSON);
}

//OUTLINE STYLE
function updateLineStyle(event) {
	console.log("updateLineStyle");
	
	//check which option is selected
	s_select_line_style = document.querySelector("#s_select_line_style");
	console.log(s_select_line_style.value);
	var style = s_select_line_style.value
	
	if (style == "solid"){
		outlineStyle = ssolid;
	}
	
	if (style == "dashed"){
	outlineStyle = sdashed;
	}
	
	if (style == "dotted"){
	outlineStyle = sdotted;
	}
	
	styleGeoJSON(LeafletGeoJSON);
	
}

// HANDLE NEXT ELEMENT
// .....






