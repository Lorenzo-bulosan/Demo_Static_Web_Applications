
// Shorten notation
const iconDeleteStorage = document.querySelector(".DeleteStorage");
const textDate = document.getElementById("date");
const List = document.getElementById("List");
const textInput = document.getElementById("input");

// rename icon classes
const iconCHECK = "fa-check-circle";
const iconUNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";


// Variables
let LIST, id;

// get list from localstorage
let dataList = localStorage.getItem("TODO");

if(dataList){	// check if data is not empty
    LIST = JSON.parse(dataList);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST);   // load the list to the user interface
}else{
    LIST = [];
    id = 0;
}

// Show the date
var today = new Date();
var dayResult = today.toLocaleDateString();

textDate.innerHTML=dayResult; // display in the app


// when user clicks the clear-all button
iconDeleteStorage.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


// Add bullet point 
document.addEventListener("keyup",function(even){

	if(event.keyCode == 13){ // if enter key is pressed
		const bulletItem = textInput.value;

		if(bulletItem){ // checks if input is empty
			
			AddBulletPoint(bulletItem,id,false,false); // show in web

			LIST.push( // add into list aswell
				{
                text : bulletItem,
                id : id,
                status : false,
                isTrash : false
				}
			);

		// save list because if you reload page its gone
		localStorage.setItem("TODO", JSON.stringify(LIST));
		id++;

		} // if not empty
		textInput.value = "";

	} // if enter
});

// Check, uncheck or delete bulletpoint
List.addEventListener("click",function(event){

	// return specific element clicked
	const clickedElement = event.target; // item in list has 2 elements
	const elementJob = clickedElement.attributes.job.value; // read info for later use

	// depending on info check/uncheck or delete
	if (elementJob == "checkUncheck"){
		toggleBulletPoint(clickedElement);
	}else if(elementJob == "delete"){
		deleteBulletPoint(clickedElement);
	}

    // update storage
    localStorage.setItem("TODO", JSON.stringify(LIST));	

});





//-----------------------------Functions-------------------------------

function AddBulletPoint(text, id, status, isTrash){

	// dont add if in trash
	if(isTrash){ return;}

	// select which icon to show
	if (status){
		var isCheck = iconCHECK;
	}else{
		var isCheck = iconUNCHECK;
	}

	// Bullet point template
	const item = `<li class="item">
                    <i class="fa ${isCheck} co" job="checkUncheck" id="${id}"></i>
                    <p class="text">${text}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;

    // display the bullet point to the web app
	List.insertAdjacentHTML("beforeend", item);
}

// show check icon or uncheck icon
function toggleBulletPoint(clickedElement){

	// change classes to display different icons
	clickedElement.classList.toggle(iconCHECK);
	clickedElement.classList.toggle(iconUNCHECK);

	/*** Update the internal list ***/
	// toggle the status to the opposite value
	LIST[clickedElement.id].status = LIST[clickedElement.id].status ? false : true;
}

// delete bulletpoint
function deleteBulletPoint(clickedElement){

	// select the entire thing not just the clicked icon but the "li"
	var WholeBulletPoint = clickedElement.parentNode;

	// To remove it need to be a level above, then remove the selected child
	WholeBulletPoint.parentNode.removeChild(WholeBulletPoint);

	/*** Update the internal list ***/
	LIST[clickedElement.id].isTrash = true;
}


// load items to the user's interface
function loadList(EntireList){
    EntireList.forEach(function(element){
        AddBulletPoint(element.text, element.id, element.status, element.isTrash);
    });
}