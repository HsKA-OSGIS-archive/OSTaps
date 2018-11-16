// next steps:
// > Filter for numerical values and those which can be converted into numeric values
// > Function for adding the clicked Attribute to Text Field
// > Validation of Text Field when Apply is clicked
// > Calculation of Attribute for Displaying in Choropleth Map


// functions for adding operators to text field
function add() {
	var textfield = document.getElementById("tf_attribute");
	textfield.value = textfield.value + " + "
}

function subtract() {
	var textfield = document.getElementById("tf_attribute");
	textfield.value = textfield.value + " - "
}

function multiply() {
	var textfield = document.getElementById("tf_attribute");
	textfield.value = textfield.value + " * "
}

function divide() {
	var textfield = document.getElementById("tf_attribute");
	textfield.value = textfield.value + " / "
}

// function for returning property list of geojson
function getProperties(gjson, filtered = false){ 
	var properties = new Array();
	
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
	var nbproperties = propertyNames.length;
	
	// filters data for numeric values and those which can be converted to numbers
	if (filtered == true) {

		for (var i = 0; i < nbfeatures; i++){								// iterates over all features
			var currFeature = gjson.features[i]

			for (var j = 0; j < nbproperties; j++) {						// iterates over all properties
				var currProperty = currFeature.properties[propertyNames[j]];
				console.log(typeof(currProperty));
				
				if (typeof(currProperty) == "number") {						// if data type of current property = number
					continue;												// if yes -> continue
				} else if (typeof(currProperty) != "number") {				// if not
					// THIS IS NOT WORKING UNTIL NOW !!!!!!!!!!!!
					// if(Number(currProperty) == NaN) {					// checks for converting non numerical attribtues into numbers https://www.w3schools.com/jsref/jsref_number.asp
						propertyNames.splice(j,1);							// delete current element from propertyNames Array
					// }
				}
			}
			
		}
	
	}
	
	
	console.log(propertyNames);
	return propertyNames;
} 

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

// Fills Dropdown for Attribute Selection dynamically
function fillAttributeDropdown(gjson) {
	properties = getProperties(gjson, filtered = true);
	
	
	dropdown = document.getElementById("s_select_attribute");

	for (var i = 0; i< properties.length; i++){
		var opt = document.createElement('option');
		opt.value = properties[i];
		opt.innerHTML = properties[i];
		dropdown.appendChild(opt);
	}
	
}