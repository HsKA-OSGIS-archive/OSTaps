

    
var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});

function save(){
	saveAs(blob, "hello world.txt");
}
