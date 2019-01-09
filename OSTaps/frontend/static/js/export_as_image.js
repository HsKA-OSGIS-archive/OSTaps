$( document ).ready(function() {
    document.getElementById('b_downImage').addEventListener('click', function() {
		leafletImage(map, exportImage);
	});
});

function exportImage(err, canvas) {
	
	console.log("extern");
	//erstellt ein HTML-Element
	var img = document.createElement('img');
	
	//legt Groesse fest
	var dimensions = map.getSize();
	img.width = dimensions.x;
	img.height = dimensions.y;
	
	//gibt eine data URI zurück, die eine Representation des Bildes zurück gibt
	img.src = canvas.toDataURL('image/png');
	
	
	//img.src = img.src.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
	//img.src = img.src.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
	
	window.open(img.src, "_blank"); 
	

}