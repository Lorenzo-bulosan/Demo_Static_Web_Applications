
window.addEventListener("load",()=>{

	const drawingSpace = document.getElementById("drawPixel");
	const canvas2d = drawingSpace.getContext("2d");
	const resultElement = document.getElementById("result");
	const deleteElement = document.getElementById("btnDelete");

	let drawing = false;

	function beginDrawing(){
		drawing = true;
	}

	function stopDrawing(){
		drawing = false;
		canvas2d.beginPath();
	}	

	function Draw(mouse){
		
		if (!drawing) { return;}

			canvas2d.lineWidth = 5;
			canvas2d.lineCap="round";

			// just client position not enough need this to not get weird scaling when page resizes etc
			var bound = drawingSpace.getBoundingClientRect();
			var x = mouse.clientX - bound.left;
			var y = mouse.clientY - bound.top;


			canvas2d.lineTo(x,y);
			canvas2d.stroke();	
			canvas2d.beginPath();
			canvas2d.moveTo(x, y);	
		
	}

	function Delete(){
		var bound = drawingSpace.getBoundingClientRect();
		canvas2d.clearRect(0,0,bound.width,bound.height)
	}

	drawingSpace.addEventListener("mousedown", beginDrawing);
	drawingSpace.addEventListener("mouseup", stopDrawing);
	drawingSpace.addEventListener("mousemove", Draw);
	deleteElement.addEventListener("click",Delete);

	resultElement.innerHTML="Working till here";

})

