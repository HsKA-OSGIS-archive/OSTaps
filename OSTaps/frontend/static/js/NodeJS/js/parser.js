var GeoStylerSLDParser = require("geostyler-sld-parser"); // NOTE: This Script needs to be browserified!!!!

window.parse2sld = function(geostylerObject){             // globally accessible function (takes Geostyler object)
  var parser = new GeoStylerSLDParser.SldStyleParser();   // create new SLD Parser from Geostyler
  parser
    .writeStyle(geostylerObject)                          // parse Geostyler Object with SLD Parser
    .then(function(style) {
      var blob = new Blob([style], {type: "text/plain;charset=utf-8"}); // make blob from resulting SLD string
      saveAs(blob, "OSTapsChoroplethStyle.sld");                        // -> FileSaver.js download
    });
}
