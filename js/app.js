/*jshint esversion: 6 */


(function () {
  "use strict";

	let totalCost = 0;
	//holds the total cost of selected activities
	const nameInput = document.getElementById("name");
	//retrieves the name input field //nameInput.focus(); // you can use autofocus in the html as well
	const form = document.querySelector("form");
	//retrieves the form to add a listener to later
	const otherTitle = document.getElementById("other-title");
	//retrieves the other title input field
	const titleInput = document.getElementById("title");
	//retrieves the title input field
	const emailInput = document.getElementById("mail");
	//retrieves the email input field
	const shirtColor = document.getElementById("colors-js-puns");
	//retrieves the color js puns div
	const color = document.getElementById("color");
	//retrieves the color select options
	const design = document.getElementById("design");
	//retrieves the design select options
	const actChoice = document.getElementById("activities");
	//retrieves the activities field set
	const payment = document.getElementById("payment");
	//retrieves the payment select options
	const creditCard = document.getElementById("credit-card");
	//retrieves the credit card div
	const bitCoin = document.getElementById("bit-coin");
	//retrieves the bitcoin div
	const payPal = document.getElementById("pay-pal");
	//retrieves the paypal div
	const submit = document.getElementById("submit");
	//retrieves the submit button

	// --- set these inputs to the class of error -----------||
	nameInput.className = "error";//                         ||
	emailInput.className = "error";//                        ||
	actChoice.className = "error";//                         ||
	document.querySelector("#zip").className = "error";//    ||
	document.querySelector("#cc-num").className = "error";// ||
	document.querySelector("#cvv").className = "error";//    ||
	// --- to disable the submit button ---------------------||

	otherTitle.className = "hide";
	// Hiding the "other" option on page load when JS is enabled
	shirtColor.className = "hide";
	// Hiding the shirt color option on page load
	bitCoin.className = "hide";
	// Hiding the bit-coin message on page load
	payPal.className = "hide";
	// Hiding the pay-pal message on page load

	//function prevents the default event
	const preventDef = (event)=> {
  		event.preventDefault();
	};
	//function meant to be a fix for firefox ... needs more work
	const addEvent = (element, eventName, callback)=> {
	    if (element.addEventListener) {
	        element.addEventListener(eventName, callback, false);
	    } else if (element.attachEvent) {
	        element.attachEvent("on" + eventName, callback);
	    }
	};
	
	const shirtCheck =  ()=>{
		//check if the chosen shirt design
		if(design.value == "js puns" || design.value == "heart js" ){
			//removes the hide class
			shirtColor.className = "";
			//check for heart shirt
			if(design.value == "heart js" ){
				//sets the index so that it doesnt retain its value
				color.selectedIndex = "0";
				//iterate through the color options and hides the ones that dont apply to the heart shirt
				for(let i=0; i<color.children.length; i++){
					if(color.children[i].value == "cornflowerblue" || color.children[i].value == "darkslategrey" || color.children[i].value == "gold") {
						//sets the children to display none for the colors that dont apply
						color.children[i].style.display = "none";
					} else {
						//otherwise it leaves the display unaffected for the colors that do apply to that shirtCheck
						color.children[i].style.display = "";
						}
				}
			} 
			//checks for js puns shirt
			if(design.value == "js puns" ){
				//sets the index so that it doesnt retain its value
				color.selectedIndex = "0";
				//iterate through the color options and hides the ones that dont apply to the heart shirt
				for(let i=0; i<color.children.length; i++){
					if(color.children[i].value == "tomato" || color.children[i].value == "steelblue" || color.children[i].value == "dimgrey") {
						//sets the children to display none for the colors that dont apply
						color.children[i].style.display = "none";
					} else {
						//otherwise it leaves the display unaffected for the colors that do apply to that shirt
						color.children[i].style.display = "";
						}
				}
			} //check to see if a shirt design has been chosen
		} else if(design.value == "Select Theme" ){
			//hide the shirt colors if a design hasent been chosen
			shirtColor.className = "hide";
			}
	};
	//a function that checks the values of the activities checkbox
	const matchCheck = ev => {
		//variable for the morning activity
		let morning = "9am-12pm";
		//variable for the afternoon activity
		let afternoon = "1pm-4pm";
		//variable for the main conference activity
		let mainConf = "Main Conference";
		//chosen activity
		let choice = ev.target;
		//parent node of the chosen activity
		let parentChoice = choice.parentNode;
		//parent node of the parent node of the chosen activity
		let guardian = parentChoice.parentNode;
		//text content of the parent of the chosen node (given the chosen activity is nested inside the label(parent) that contains the text)
		let content = parentChoice.textContent;
		//sets the string value attribute of the chioce to a number for addition of the cost via the totalCost variable
		let val = parseInt(choice.value);

		//a matching function to match the morning variable to the corresponding text contained in the label
		const matcher = snack =>{
			//new regular expression that takes two parameters one being the string to check for and the case insensitive regular expression "i"
			let regex = new RegExp(snack, "i");
			//check to see if the text content in the parent node matches the regular expression of the string in the variable
			if(content.match(regex) == snack){ 
				//console log the choice value
				//console.log(`checked ev ${choice.value} <--value`);
				//console log true or false if the attribute is checked or not
				//console.log(choice.hasAttribute("checked"));
				//continues if the attribute hasnt been set to checked
				if(choice.hasAttribute("checked") === false){
					//sets the attribute to checked
					choice.setAttribute("checked", "checked");
					//checks to see if the parameter is the main conference checkbox
					if(snack == mainConf){
						//adds the value of the main conference ($200)
						totalCost += val;
					} else {
						//adds the target choice value
						totalCost += val;
					}
					//iterate through the activities
					for(let i=0; i<guardian.children.length; i++){
						//check for a match and that it is not checked
						if(guardian.children[i].textContent.match(snack) == snack && !guardian.children[i].children[0].hasAttribute("checked") ){
							//selects the inputs and disables them
							guardian.children[i].children[0].setAttribute("disabled", "disabled");
							//disables the labels
							guardian.children[i].setAttribute("disabled", "disabled");
							//greys out the disabled choices
							guardian.children[i].style.color = "GREY";
						}
					}
				} else {
					//removes the checked attribute
					choice.removeAttribute("checked");
					//checks to see if the choice is mainconf
					if(snack == mainConf){
						//removes 200
						totalCost -= val;
					} else {
						//removes 100
						totalCost -= val;
					}
					//iterate through the labels and inputs to reenable them
					for(let i=0; i<guardian.children.length; i++){
						//iterates through the match choices
						if(guardian.children[i].textContent.match(snack) == snack  ){
							//removes disabled attribute from the input
							guardian.children[i].children[0].removeAttribute("disabled");
							//removes disabled attribute from the label
							guardian.children[i].removeAttribute("disabled");
							//removes the greyed out style color 
							guardian.children[i].style.color = "";
						}
					}
				}
				//checks total cost is above zero 
				if(totalCost > 0){
				//sets attribute to enable to clear the errors to allow use of submit button
    			document.querySelector("#activities").setAttribute("class", "checked");
    			//checks total cost is zero
				} else if (totalCost < 100){
				//sets activities and disables the use of the submit button
				document.querySelector("#activities").setAttribute("class", "error");

				}
			}
		};
		//matches afternoon times
		matcher(afternoon);
		//matches morning times
		matcher(morning);
		//matches main conf
		matcher(mainConf);
		//calls cost function with the calculated total cost as an argument
		cost(totalCost);
	};
	//creates a visual total cost at the bottom of the activities
	const cost = (tCost)=>{
		//retrieves the costing id
		let costing = document.getElementById("costing");
		//checks to see if the costing id exists
		if(costing){
		//removes the previously appended child costing	
		actChoice.removeChild(costing);
		}	
		//console.log(`Total cost: ${tCost}`);
		//new paragraph element
		let para = document.createElement("p");
		//Inner text containing the dynamic cost variable
		if(!document.querySelector(".checked") && tCost !== 0){
			para.innerText = tCost;
		} else {
			para.innerText = `Total Cost: $ ${tCost}`;
		}
		//sets id to costing
		para.setAttribute("id", "costing");
		//takes the totalCost variable as a number and sets it to a string value
		para.setAttribute("value", tCost.toString());
		//Appends the costing child to the bottom of activities
		actChoice.appendChild(para);
	};
	//checks the chosen payment type and hides the others
	const paymentCheck = ev=>{
		//removes all hidden attributes 
		bitCoin.removeAttribute("class", "hide");
		payPal.removeAttribute("class", "hide");
		creditCard.removeAttribute("class", "hide");
		//console.log(ev.target.value);
		//if Credit card chosen, hides the other two options
		if(ev.target.value == "credit card"){
			bitCoin.setAttribute("class", "hide");
			payPal.setAttribute("class", "hide");
		}
		//if paypal chosen, hides the other two options
		if(ev.target.value == "paypal"){
			bitCoin.setAttribute("class", "hide");
			creditCard.setAttribute("class", "hide");
		}
		//if bitcoin chosen, hides the other two options
		if(ev.target.value == "bitcoin"){
			payPal.setAttribute("class", "hide");
			creditCard.setAttribute("class", "hide");
		}
	};

	const titleChecker = ev => {
		//checks to see if other title is chosen
		if(titleInput.value == "other"){
		//unhides other title
		otherTitle.removeAttribute("class");
		} else { 
			//hides other title
			otherTitle.setAttribute("class", "hide");
		}
	};

	const formValidator = () => {
		//sets the border color of an input box to red in the ev of an error
		const borderErr = (ref,val = "2px solid red") => {ref.style.border = val;};
		//checks the name lengths is between 4 and 50 characters
		const nameLen = new RegExp(/^[a-zA-Z\s]{4,50}$/, "i");
		//checks the validity of the email
		const emailRegex = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
		//checks that the credit card number is 13 - 16 digits
		const creditRegex = new RegExp(/\b\d{13,16}\b/g);
		//checks the zip is 5 digits
		const zipRegex = new RegExp(/\b\d{5}\b/g);
		//checks the cvv is 3 digits
		const cvvRegex = new RegExp(/\b\d{3}\b/g);
		

		const inputCheck = (divId,specs,msg1,msg2) =>{
			//parent of the ev target
			let parent = ev.target.parentNode;
			//creates a span element
			let span = document.createElement("span");
			//if the divId exists remove it
			if(document.getElementById(divId)){
					//removes the divId
					parent.removeChild(document.getElementById(divId));
				}
				//insert the span element before the current target
				parent.insertBefore(span, ev.target);
				//set the attribute to the current divId
				span.setAttribute("id", divId); 
				//check if the input is blank
				if(ev.target.value === ""){
				//set the border color on the target input 
				borderErr(ev.target);
				//Give it the class error to disable the submit
				span.setAttribute("class", "error");
				//Present the message 1
				span.textContent = msg1;
				//else if the matched specs dont check out
				} else if(!ev.target.value.match(specs)){
				//set border color red
				borderErr(ev.target);
				//set class to error
				span.setAttribute("class", "error");
				//Present message 2
				span.textContent = msg2;
				//Otherwise its good to go
				} else {
					//remove error message
					span.textContent = "" ;
					//set class to enable submit
					span.setAttribute("class", "enable");
					//remove the red border
					borderErr(ev.target,"");
					//set class to enabe submit
					ev.target.setAttribute("class", "enable");
				}
		};
		//The functional list of inputs to check for errors and their corresponding messages and specs
		const errCheck = (checker)=>{
			//checks name input
		    if(checker.id === "name"){
		    	
		    	let msg1 = "Please type your full name";
				let msg2 = "Must be at least four letters";
				let divId = "nameDiv";
				let specs = nameLen;
				//runs inputCheck function with supplied arguments
				inputCheck(divId,specs,msg1,msg2);
		    }
		    //checks the email input
	    	if(checker.id === "mail"){

		    	let msg1 = "Please enter your email";
				let msg2 = "invalid email address";
				let divId = "emailDiv";
				let specs = emailRegex;
				//runs inputCheck function with supplied arguments
				inputCheck(divId,specs,msg1,msg2);
	    	}
	    	//checks the other title input
    		if(checker.id === "other-title"){
    			let msg1 = "Please enter a title";
				let msg2 = "invalid title";
				let divId = "titleDiv";
				let specs = "";
				//runs inputCheck function with supplied arguments
				inputCheck(divId,specs,msg1,msg2);
    		}
    		//checks the credit card number
    		if(checker.id === "cc-num"){
    			let msg1 = "Enter Credit Card number";
				let msg2 = "invalid number";
				let divId = "creditDiv";
				let specs = creditRegex;
				//runs inputCheck function with supplied arguments
				inputCheck(divId,specs,msg1,msg2);
    		}
    		//checks the zip
    		if(checker.id === "zip"){
    			let msg1 = "Enter Zip";
				let msg2 = "invalid Zip";
				let divId = "zipDiv";
				let specs = zipRegex;
				//runs inputCheck function with supplied arguments
				inputCheck(divId,specs,msg1,msg2);
    		}
    		//checks the cvv
    		if(checker.id === "cvv"){
    			let msg1 = "Enter CVV";
				let msg2 = "invalid CVV";
				let divId = "cvvDiv";
				let specs = cvvRegex;
				//runs inputCheck function with supplied arguments
				inputCheck(divId,specs,msg1,msg2);
    		}
    		//checks if a pay option other than credit card has been chosen
    		if(payment.value === "paypal" || payment.value === "bitcoin" ){
    			//Enable all previously disabled inputs to allow submit
    			document.querySelector("#zip").className = "enable";
				document.querySelector("#cc-num").className = "enable";
				document.querySelector("#cvv").className = "enable";
    		}
    		//checks if there is at least one checked activity
    		if(!document.querySelector(".checked")){
				//calls cost function with the calculated total cost as an argument
				cost("Please choose an activity");
    		}
    		//Checks if there is any error class
    		if(document.querySelector(".error")){
    			//gets the message element
    			let msg = document.getElementById("subMsg");
    			//checks for a current message and removes it
    			if(document.getElementById("subMsg")){
					form.removeChild(msg);
    			}
    			//creates a paragraph
    			let subMsg = document.createElement("p");
    			//sets id to subMsg
    			subMsg.setAttribute("id", "subMsg");
    			//sets inner text message
    			subMsg.innerText = "Please fill all required fields";
    			//attaches the message to the bottom of the form
    			form.appendChild(subMsg);
    			//adds listener to prevent default action
    			submit.addEventListener("click", preventDef);//true or false
    			
    		}
    		//If no error class is to be found
    		if(!document.querySelector(".error")){
    			//retrieves subMsg id
    			let msg = document.getElementById("subMsg");
    			//remove the error message from the bottom of the form
    			form.removeChild(msg);
    			//removes the prevent default listener
    			submit.removeEventListener("click", preventDef);//true or false
    		}
		};
			//Calls the errCheck function with the ev target as the argument
			//This was a fix meant to work with firefox
	var ev = window.event || event;
			errCheck(ev.target);
	};

// -- LISTENERS -- //
	

	//calls validator function on the form in event of a focus out from an input
	addEvent(form, "focusout", formValidator);
			// form.addEventListener("focusout",formValidator);
	//calls validator function on the form in event of a keyup from an input
	addEvent(form, "keyup", formValidator);
			//form.addEventListener("keyup",formValidator);
	//Adds a listener to the title selection for use with other-title
	addEvent(titleInput, "click", titleChecker);
			//titleInput.addEventListener("click", titleChecker);
	//Adds a listener to design choices
	addEvent(design, "change", shirtCheck);
			//design.addEventListener("change", shirtCheck);
	//Adds a listener to activities choices
	addEvent(actChoice, "change", matchCheck);
			//actChoice.addEventListener("change",matchCheck);
	//Adds a listener to payment options
	addEvent(payment, "change", paymentCheck);
			//payment.addEventListener("change",paymentCheck);
}());
