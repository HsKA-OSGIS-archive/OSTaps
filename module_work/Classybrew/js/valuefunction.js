function match (value,breaksArr,colorArr) {
		console.log("Array",breaksArr);
		console.log("value:",value);
		var slicefirst = breaksArr.splice(0,1);
		//var slicelast = breaksArr.splice(breaksArr.length-1,1);
		console.log("removed:",slicefirst);
		//console.log("removed:",slicelast);
		console.log("array:",breaksArr);
		var i = 0;
		while (i < breaksArr.length) {
					
			
			console.log(i);
			if (i==0){
				if (value < breaksArr[i]){
					console.log(colorArr[i])
					return (colorArr[i])
					}
				else {
					console.log("Not in first margin!");
				}			
			}
			console.log("break_i:",breaksArr[i])
			console.log("break_i+1",breaksArr[i+1])
			if (breaksArr[i] < value && value< breaksArr[i+1]){
			console.log(colorArr[i+1])
			console.log("Right color found!")
			try {
					return colorArr[i+1];
				} catch(err) {
					
					console.log("Highest color reached!");
					console.log(colorArr[i]);
					return colorArr[i];
				}
			}
			else {
			i++
			console.log("i raised by 1")
			}
			//breaksArr[i] < value > breaksArr[i+1] ? console.log(colorArr[i]) :
			//i++;
					
		}
		console.log(colorArr[i+1])
}