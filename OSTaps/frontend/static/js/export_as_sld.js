$( document ).ready(function() {
    document.getElementById('b_downSLD').addEventListener('click', function() {
      var geostylerObject = classybrew2geostyler(colorBrew, attributeName);
      parse2sld(geostylerObject);
    });
});
