function classybrew2geostyler(colorObject, attribute2style){
	geostylerStyle =
	{
	  "name": "OSTapsChoroplethStyle",
	  "rules": []
	}
	
	fillColors = colorObject.getColors();
	margins = colorObject.range
	nClasses = colorObject.numClasses
    for (var i = 0; i < nClasses; i++) {
		addRule(geostylerStyle, attribute2style, margins[i].toString(), margins[i+1].toString(), fillColors[i]);
    }
	return geostylerStyle
}



function addRule(geostylerStyle, attribute2style, lowerMargin, upperMargin, fillColor){
    
	name = attribute2style + " " + lowerMargin + " - " + upperMargin;
	rule = 
	{
      "name": name,
      "filter": [
        "&&",
        [
          ">=",
          attribute2style,
          lowerMargin
        ],
        [
          "<",
          attribute2style,
          upperMargin
        ]
      ],
      "symbolizers": [
        {
          "kind": "Fill",
          "color": fillColor
        }
      ]
    }	
	geostylerStyle.rules.push(rule);
}