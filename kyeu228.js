function nodeDraw(data){
	let nodeSize = data.length;
	let screen = document.getElementById("node");
	let matrixScreen = document.getElementById("matrix");
	let size = window.screen.width;
	screen.setAttribute('viewBox', '0 0 '+ size.toString() + ' 650');
	let divide = size/nodeSize;
	let rad = size/(nodeSize * 5);
	let xPos = rad*3;
	let yPos = rad + 10;
	let pos = [[]];
	for(let i = 0; i<nodeSize; i++){
		pos[i] = [xPos, yPos];
		xPos += divide - 10;
	}
	for(let i = 0; i<nodeSize; i++){
		for(let j = 0; j<data[i].length; j++){
			if(data[i][j] == 1 && pos[i][0] < pos[j][0]){
				screen.innerHTML += "<path d= 'M " +(pos[i][0].toString())+" "+ (pos[i][1].toString())+" Q "+ ((pos[i][0] + pos[j][0])/2).toString()+" "+ ((pos[j][0] - pos[i][0])/1.5).toString() +" "+pos[j][0].toString()+" "+pos[j][1].toString() + "' stroke = 'black' stroke-width = '1px' fill = 'none'/>";
			}
		}
		screen.innerHTML += "<circle cx = " + pos[i][0] + " cy =" + pos[i][1] + " r = " + rad + " fill = 'white' stroke = 'black'/><text x = " + (pos[i][0]-10) + " y = " + (pos[i][1]+10) +">" + i + "</text>";
	}
	
	matrixScreen.innerHTML += "<br>&ensp;[<br>"
	for (i in data){
		matrixScreen.innerHTML += "&ensp;&emsp; [<br>"
		for(j in data[i]){
			if(j  == data[i].length - 1){
				matrixScreen.innerHTML += "&ensp;&emsp; &emsp;" + data[i][j].toString() + "<br>"
			}else{
				matrixScreen.innerHTML += "&ensp;&emsp; &emsp;" + data[i][j].toString() + ",<br>"
			}
		}
		if(i == data.length - 1){
			matrixScreen.innerHTML += "&ensp;&emsp; ]<br>"
		}else{
			matrixScreen.innerHTML += "&ensp;&emsp; ],<br>"
		}
	}
	matrixScreen.innerHTML += "&ensp;] <br> &ensp;"
	
	
}

const nodeFetch = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/g',{
	headers:{
		"Accept":"application/json",
	},
});

const nodePromise = nodeFetch.then(response => response.json()).then(data => nodeDraw(data));



