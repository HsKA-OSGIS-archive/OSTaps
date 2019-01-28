$( document ).ready(function() {
    document.getElementById('b_downImage').addEventListener('click', function() {
		leafletImage(map, exportImage);
	});
});

function exportImage(err, canvas) {

	//erstellt ein HTML-Element
	var img = document.createElement('img');

	//legt Groesse fest
	var dimensions = map.getSize();
	img.width = dimensions.x;
	img.height = dimensions.y;

	//gibt eine data URI zurück, die eine Representation des Bildes zurück gibt
	img.src = canvas.toDataURL('image/png');
	download(img.src, "yourMap.png", "image/png");

}
