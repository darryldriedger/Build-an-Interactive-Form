/*jshint esversion: 6 */
/*globals $:false */

(function () {
  "use strict";

const nameInput = document.getElementById("name");//retrieving the search input
//nameInput.focus(); // you can use autofocus in the html as well
const act = document.getElementById("activities");//retrieving the search input
const otherDiv = document.getElementById("otherOption");//retrieving the search input
const titleInput = document.getElementById("title");//retrieving the search input
const shirtColor = document.getElementById("colors-js-puns");//retrieving the search input
const color = document.getElementById("color");//retrieving the search input
const design = document.getElementById("design");//retrieving the search input


const heartShirt = document.querySelectorAll(".heart");
const punShirt = document.querySelectorAll(".Puns");

const other = '<input type="text" id="other-title" name="other-title" placeholder="Your job role">'
//-------------------------------------------------------------------------------------------------
shirtColor.className = "hide";

const shirtCheck =  ()=>{
	
	if(design.value == "js puns" || design.value == "heart js" ){
		shirtColor.className = "";
		if(design.value == "heart js" ){
			color.selectedIndex = "0";
			for(let i=0; i<color.children.length; i++){
				if(color.children[i].value == "cornflowerblue" || color.children[i].value == "darkslategrey" || color.children[i].value == "gold") {//
					color.children[i].style.display = "none";
				} else {
						color.children[i].style.display = "";
					};
			}
		} 

		if(design.value == "js puns" ){
			color.selectedIndex = "0";
			for(let i=0; i<color.children.length; i++){
				if(color.children[i].value == "tomato" || color.children[i].value == "steelblue" || color.children[i].value == "dimgrey") { //
					color.children[i].style.display = "none";
				} else {
						color.children[i].style.display = "";
					};
			}
		} /**/
	} else if(design.value == "Select Theme" ){
		shirtColor.className = "hide";
		};
};
// -- LISTENERS ---
design.addEventListener("click", shirtCheck);

titleInput.addEventListener("click", (event)=>{
	
	if(titleInput.value == "other"){
	otherDiv.innerHTML = other
	} else { 
		otherDiv.innerHTML = "";
	};
});

  }());
titleInput.addEventListener("change",(event) => {
  if(event.target.tagName == "OPTION"){
		//let snack = this.value;
		let snack = event.target.value;
		console.log(`value: ${snack}`);
		console.log("hello");
//     let snack = event.target.textContent;//retrieves the number of the page clicked
//     console.log(`page ${snack}`);//logs selected page to the console
//     pageLoad(snack);
   };
 });
