// GUI elements
var i_select_line_color;
var f_select_line_width;
var s_select_line_style;
var s_select_fill_color;
var s_select_numb_class;

//given outline styles
var ssolid = "";
var sdashed = "15,10";
var sdotted = "1,10";

// default values, will be overwritten by user defined values
var outlineColor = "#3c3c3c";
var fillColor = "#CCCCCC";
var lineWidth  = 1;
var outlineStyle = ssolid;

var numClasses = 3
var colorCode = "OrRd"

var arrAttribute = "";
var attributeName = "";

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
			fillColor: getColor(feature),
			weight: lineWidth,
			dashArray: outlineStyle,
			fillOpacity: 1
		});
	});
	if (arrAttribute != ""){
		createChoroplethLegend();
	}
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
	s_select_fill_color = document.querySelector("#s_select_color");
	s_select_numb_class = document.querySelector("#s_select_classes");

	// overwrites the default color by a nicer color defined by us (outlineColor)
	i_select_line_color.value = outlineColor;
	f_select_line_width.value = lineWidth;
	s_select_line_style.value = "solid";
	s_select_fill_color.value = colorCode;
	s_select_numb_class.value = numClasses;

	// add listener to check if color is changed by the user
	i_select_line_color.addEventListener("change", updateOutlineColor, true);
	// add listener to check if line width is changed by the user
	f_select_line_width.addEventListener("change", updateLineWidth, true);
	// add listener to check if line style is changed by the user
	s_select_line_style.addEventListener("change", updateLineStyle, true);
	// add listener to check if Color Code is changed by the user
	s_select_fill_color.addEventListener("change", updateFillColor, true);
	// add listener to check if Number of Classes changed by the user
	s_select_numb_class.addEventListener("change", updateNumclasses, true);

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
	styleGeoJSON(LeafletGeoJSON);
}

// OUTLINE WIDTH
function updateLineWidth(event) {
	// get lineWidth
	lineWidth = f_select_line_width.value;
	console.log(f_select_line_width.value);
	console.log(lineWidth)
	styleGeoJSON(LeafletGeoJSON);
}

//OUTLINE STYLE
function updateLineStyle(event) {
	//check which option is selected
	s_select_line_style = document.querySelector("#s_select_line_style");
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

// FILL COLOR
function updateFillColor(event) {
	// get colorCode
	colorCode = s_select_fill_color.value;
	styleGeoJSON(LeafletGeoJSON);
}

// Change Number of Classes
function updateNumclasses(event) {
	// get numClasses
	numClasses = s_select_numb_class.value;
	styleGeoJSON(LeafletGeoJSON);
}

var colorBrew;
function getColor(feature){
	if (arrAttribute == ""){
		return fillColor;
	} else {
		t = new Color();
		t.setNumClasses(numClasses);
		t.setColorCode(colorCode);
		t.setSeries(arrAttribute)
		t.classify(arrAttribute);
		colorBrew = t;
		return t.getColorInRange(feature.feature.properties[attributeName])
	}
}

var legend;
// create Legend:
function createChoroplethLegend(){
	if (typeof legend === 'object') {
		map.removeControl(legend); // removes old legend
	}

	legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {
		var colors = colorBrew.getColors();
		var range = colorBrew.range
		var div = L.DomUtil.create('div', 'info legend'),
			grades = range,
			labels = [],
			from, to;
		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];
			if (to) {
				labels.push('<i style="background:' + colors[i] + '"></i> ' + from + " - " + to);
			}
		}
		div.innerHTML = labels.join('<br>');
		return div;
	};
	legend.addTo(map);
}
