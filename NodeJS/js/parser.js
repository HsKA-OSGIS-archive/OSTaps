var GeoStylerSLDParser = require("geostyler-sld-parser");

const pointSimplePoint = {
  name: "My Style",
  rules: [
    {
      name: "My Rule",
      symbolizers: [
        {
          kind: "Mark",
          wellKnownName: "Circle",
          color: "#FF0000",
          radius: 6
        }
      ]
    }
  ]
};
var parser = new GeoStylerSLDParser.SldStyleParser();
parser
  .writeStyle(pointSimplePoint)
  .then(function(style) {
    console.log(style);
  });