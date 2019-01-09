// TODO function calculateNewAttribute
// Makes Div for Attribute Selection invisible based on selection of radio buttons
function selectAttributeSelectionType() {
	var singleAttributeDiv = document.getElementById("s_attribute_selection");
	var calcAttributeDiv = document.getElementById("c_attribute_selection");

	var singleRadio = document.getElementById("singleRadio");
	var calcRadio = document.getElementById("calculatedRadio");

	if (singleRadio.checked){
		calcAttributeDiv.style.display = "none";
		singleAttributeDiv.style.display = "block";
	} else if (calcRadio.checked){
		singleAttributeDiv.style.display = "none";
		calcAttributeDiv.style.display = "block";
	}


}

// functions for adding operators + - * / ( ) to text field
function add() {
	var cursorPos = $('#tf_attribute').prop('selectionStart');
	var v = $('#tf_attribute').val();
	var textBefore = v.substring(0,  cursorPos );
	var textAfter  = v.substring( cursorPos, v.length );
	$('#tf_attribute').val( textBefore+ " + " + textAfter );
}

function subtract() {
	var cursorPos = $('#tf_attribute').prop('selectionStart');
	var v = $('#tf_attribute').val();
	var textBefore = v.substring(0,  cursorPos );
	var textAfter  = v.substring( cursorPos, v.length );
	$('#tf_attribute').val( textBefore+ " - " + textAfter );
}

function multiply() {
	var cursorPos = $('#tf_attribute').prop('selectionStart');
	var v = $('#tf_attribute').val();
	var textBefore = v.substring(0,  cursorPos );
	var textAfter  = v.substring( cursorPos, v.length );
	$('#tf_attribute').val( textBefore+ " * " + textAfter );
}

function divide() {
	var cursorPos = $('#tf_attribute').prop('selectionStart');
	var v = $('#tf_attribute').val();
	var textBefore = v.substring(0,  cursorPos );
	var textAfter  = v.substring( cursorPos, v.length );
	$('#tf_attribute').val( textBefore+ " / " + textAfter );
}

function obrackets() {
	var cursorPos = $('#tf_attribute').prop('selectionStart');
	var v = $('#tf_attribute').val();
	var textBefore = v.substring(0,  cursorPos );
	var textAfter  = v.substring( cursorPos, v.length );
	$('#tf_attribute').val( textBefore+ " ( " + textAfter );
}

function cbrackets() {
	var cursorPos = $('#tf_attribute').prop('selectionStart');
	var v = $('#tf_attribute').val();
	var textBefore = v.substring(0,  cursorPos );
	var textAfter  = v.substring( cursorPos, v.length );
	$('#tf_attribute').val( textBefore+ " ) " + textAfter );
}

// adds Clicked Value of Dropdown to Textfield (attached to onchange method of select)
function addAttributeToTextfield() {
	var dropdown = document.getElementById("calc_s_select_attribute");
	var selectedOption = dropdown.options[dropdown.selectedIndex].text; // holds the changed value of select

	var cursorPos = $('#tf_attribute').prop('selectionStart');			// assigns the changed value to the text field
	var v = $('#tf_attribute').val();
	var textBefore = v.substring(0,  cursorPos );
	var textAfter  = v.substring( cursorPos, v.length );
	$('#tf_attribute').val( textBefore+ selectedOption + textAfter );

}

// Fills Dropdown for Attribute Selection dynamically with Result of getProperties function
// !!!!! TODO https://stackoverflow.com/questions/12713564/function-in-javascript-that-can-be-called-only-once
function fillAttributeDropdownCalc(gjson) {

	fillAttributeDropdownCalc = function(){}; // realizes that function is only executed once

	properties = getProperties(gjson, filtered = true);

	dropdown = document.getElementById("calc_s_select_attribute");


	for (var i = 0; i< properties.length; i++){
		var opt = document.createElement('option');
		opt.value = properties[i];
		opt.innerHTML = properties[i];
		dropdown.appendChild(opt);
	}



}

function fillAttributeDropdownSing(gjson) {

	fillAttributeDropdownSing = function(){}; // realizes that function is only executed once

	console.log("inside function");
	properties = getProperties(gjson, filtered = true);


	dropdown = document.getElementById("sing_s_select_attribute");


	for (var i = 0; i< properties.length; i++){
		var opt = document.createElement('option');
		opt.value = properties[i];
		opt.innerHTML = properties[i];
		dropdown.appendChild(opt);
	}
}

var attributelist;

// function for returning numerical property list of geojson
function getProperties(gjson, filtered = false){
	var properties = new Array();
	console.log(gjson);
	// saves all properties in a 2dim array
	var nbfeatures = Object.keys(gjson.features).length;
	for (var i = 0; i < nbfeatures; i++){
		properties.push(Object.keys(gjson.features[i].properties));
	}

	// checks if the properties of all features of are identical
	for (var i = 0; i < properties.length; i++) { 							// iterates over properties of all features
		if (i != properties.length - 1) { 									// if end is not reached yet
			if (arraysEqual(properties[i], properties[i+1]) == true) {		// continue if arrays are equal, break and return false if not
				continue;
			} else {
				break;
				return false;
			}
		} else if (i == properties.length - 1) {							// if end is reached, compare last array with first to prevent arrayindexoutofboundsexception
			if (arraysEqual(properties[i], properties[0]) == true) {		// continue if arrays are equal, break and return false if not
				continue;
			} else {
				break;
				return false;
			}
		}
	}

	var propertyNames = properties[0];										// if all arrays are equal (which should be the case for a valid geojson), return property list of features
	var numericProperties = properties[1];
	var nbproperties = propertyNames.length;

	// filters data for numeric values and those which can be converted to numbers
	if (filtered == true) {

		for (var i = 0; i < nbfeatures; i++){								// iterates over all features
			var currFeature = gjson.features[i]

			for (var j = 0; j < nbproperties; j++) {						// iterates over all properties
				var currProperty = currFeature.properties[propertyNames[j]];
				if (typeof(currProperty) == "number") {						// if data type of current property = number
					continue;												// if yes -> continue
				} else {													// if not
					if(isNaN(Number(currProperty))) {						// checks for converting non numerical attributes into numbers https://www.w3schools.com/jsref/jsref_number.asp
						numericProperties.remove(propertyNames[j]);			// delete current property name from numericProperties Array
					}
				}
			}

		}
	}

	attributelist = numericProperties;
	return numericProperties; // this is the list of numeric properties

}

// function validates the user input and either returns an error to the user or calculates the new attribute, saves it permanently to the geojson and returns it in order to further process it for styling
function calculateNewAttribute(){

	// VALIDATION
	var calculation = document.getElementById("tf_attribute").value; // returning string https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval // returns the users input calculation
	var countCorrectElements = 0; 		// counter for the number of correct elements
	cSplit = calculation.split(" ");    // splits Calculation Statement
	newCalc = ""; 						// empty string which will be filled with correct calculation statements

	for (var i = 0; i < cSplit.length; i++){ 											// iterating over splitted user input string
		cElement = cSplit[i];
		if (attributelist.indexOf(cElement) != -1){ 									// if current element is an existing attribute
			newCalc += "Number(GeoJSON.features[i].properties[\"" + cElement +  "\"]) " // append this to the newCalc String --> example for "1990" as attribute -> GeoJSON.features[i].properties["1990"]
			countCorrectElements++; 													// increment number of correct elements by 1
		} else if (cElement == "+" || cElement == "-"|| cElement == "/"|| cElement == "*"|| cElement == "("|| cElement == ")" || !isNaN(Number(cElement))){ // // if current element is one of the calculators or a number
			newCalc += cElement + " " 													// append current element to current newCalc String
			countCorrectElements++;														// increment number of correct elements by 1
		}
	}

	if (countCorrectElements == cSplit.length){ // if statement is valid
		var nbfeatures = Object.keys(GeoJSON.features).length;
		try {
			var values2style = [] 												// empty array which will then be filled with new calculated attribute
			// CALCULATION OF NEW ATTRIBUTE
			for (var i = 0; i < nbfeatures; i++){ 								// iterate over all features of GeoJSON
				GeoJSON.features[i].properties["newProperty"] = eval(newCalc);	// and evaluate the newCalc String and add it as a newProperty to GeoJSON
				// CONVERSION OF CALCULATED ATTRIBUTE INTO ARRAY FOR RETURNING AND FURTHER PROCESSING
				values2style.push(GeoJSON.features[i].properties["newProperty"])

			}

			// UPDATE GEOJSON
			var csrftoken = getCookie('csrftoken');								// get crsf token

			$.ajax({
				url: '/update/',												// execute update method
				type: 'post',
				dataType: 'json',
				async: true,
				data: {
					csrfmiddlewaretoken: csrftoken,
					geojson: JSON.stringify(GeoJSON),				// write stringified geojson
					filename: filename											// as filename
				}
			});

		// if statement is invalid
		} catch (e) {															// if evaluation is not possible: show error to user
			alert("Invalid Calculation Statement")
		}
	} else {
		alert("Invalid Calculation Statement");									// if evaluation is not possible: show error to user
	}

	arrAttribute = values2style;	// FOR LUKAS N --> this array is returned when user clicks apply after successfully calculating a new attribute
	attributeName = "newProperty"	// contains the values from which the natural breaks should then be calculated
	styleGeoJSON(LeafletGeoJSON)	// ->style_geoJson.js
}

// function returns an array containing the values for calculating natural breaks from if user clicks apply when selecting a single attribute
function returnSingleAttribute(){
	var nbfeatures = Object.keys(GeoJSON.features).length;						// number of features of geojson
	dropdownValue = document.getElementById("sing_s_select_attribute").value;	// attribute name the user selected
	var values2style = [];														// empty array to be filled
	for (var i = 0; i < nbfeatures; i++){
		values2style.push(GeoJSON.features[i].properties[dropdownValue]);		// fill array with attribute value of current feature
	}
	arrAttribute = values2style;	// FOR LUKAS N --> this array is returned when user clicks apply after selecting a single attribute for styling
	attributeName = dropdownValue // contains the values from which the natural breaks should then be calculated
	styleGeoJSON(LeafletGeoJSON)	// ->style_geoJson.js
}

// EXTERNAL FUNCTIONS
// Removes a specific value from an array https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

// function for checking if 2 arrays are identical (https://stackoverflow.com/questions/4025893/how-to-check-identical-array-in-most-efficient-way/4025958)
function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length){
        return false;
	}
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

// https://docs.djangoproject.com/en/2.1/ref/csrf/
// to prevent CSRF-ERROR
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
