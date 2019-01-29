function classybrew2geostyler(color_object, attribute2style, outline_color="#000000", outline_width=1, outline_style=""){
	console.log(outline_color);
	console.log(outline_width);
	console.log(outline_style);

	geostylerStyle =
	{
	  "name": "OSTapsChoroplethStyle",
	  "rules": []
	};

	try {
		fillColors = color_object.getColors();
		margins = color_object.range
		nClasses = color_object.numClasses

		for (var i = 0; i < nClasses; i++) {
			addRule(geostylerStyle, attribute2style, margins[i].toString(), margins[i+1].toString(), fillColors[i], outline_color, outline_width, outline_style, i);
		}

		return geostylerStyle
	}
	catch (e) {
		console.log("Please supply an attribute to style the Choropleth Map")
	}
}

function addRule(geostylerStyle, attribute2style, lowerMargin, upperMargin, fill_color, outline_color, outline_width, outline_style, i){
	name = attribute2style + " " + lowerMargin + " - " + upperMargin;
	rule =
	{
      "name": name,
      "filter": [
        "&&",
        [
          (i==0) ? ">=" : ">",
          attribute2style,
          lowerMargin
        ],
        [
          "<=",
          attribute2style,
          upperMargin
        ]
      ],
      "symbolizers": [
        {
          "kind": "Fill",
          "color": rgbToHex(fill_color),
					"outlineColor": outline_color,
					"outlineWidth": outline_width,
        }
      ]
  }
	outline_style2Geostyle(rule, outline_style)
	console.log(rule);
	geostylerStyle.rules.push(rule);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgbString) {  // e.g. rgb(255,0,0)
		rgb = rgbString.replace("rgb(", "").replace(")", "").split(",") // -> ["255","0","0"]
    return "#" + componentToHex(parseInt(rgb[0])) + componentToHex(parseInt(rgb[1])) + componentToHex(parseInt(rgb[2])); // -> "#ff0000"
}

function outline_style2Geostyle (rule, outline_style){
	if (outline_style == "15,10") { // dashed
		rule.symbolizers[0].outlineDasharray = [0,0];
	}
	if (outline_style == "1,10"){ // dotted
		rule.symbolizers[0].outlineDasharray = [1,2];
	}
}
