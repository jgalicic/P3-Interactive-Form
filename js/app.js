$( document ).ready(function() {

	const name = document.getElementById("name");
	const mail = document.getElementById("mail");
	const activities = $('.activities');
	const ccNum = $('#cc-num');
	const zipCode = $('#zip');
	const cvv = $('#cvv');

	// Regular expression to validate email format 
	const emailRegEx = /\S+@\S+\.\S+/;

	// Form will not submit unless all these are true
	let nameIsValid = false;
	let mailIsValid = false;
	let paymentIsValid = false;
	let cvvIsValid = false;
	let ccNumIsValid = false;
	let zipCodeIsValid = false;

	function isValidName(inputName) {
		return /\w+\s+\w+/.test(inputName);
	}
   
    function checkName() {

    	// Stopper prevents additional name tips from appearing multiple times
    	let stopper = 0;

    	$(name).on('keyup blur', function() {
    		if (isValidName(this.value)) {
    			$(this).removeClass("needs-attention");
    			$("#name-tip").toggle(false);
    			$("#name-error").toggle(false);
    			nameIsValid = true;
    		}
    	});

   	    $(name).blur(function() {

   	    	// Check if field is empty
   	    	if (this.value === "") {

   				$(this).addClass("needs-attention");
   				$(this).attr("placeholder", "Please enter your name");
   				nameIsValid = false;
   				$("#name-tip").toggle(false);
   				stopper = 0;

   			}

   			else if (isValidName(this.value)) {
   				$("#name-tip").toggle(false);
   				$(this).removeClass("needs-attention");
   				nameIsValid = true;
   			}

   			// Check for a first and last name
   	    	else if (stopper < 1) {

   	    		$(this).after("<div id='name-tip' style='color:red;margin-bottom: 20px;'>Please enter your full name</div>");
   	    		$(this).addClass("needs-attention");
   				nameIsValid = false;
   				stopper = 1;
        	} 
		});
    }

    // Checks email validity (anystring@anystring.anystring)
    function isValidEmailAddress(emailAddress) {
    			return emailRegEx.test(emailAddress);
			};	

    function checkMail () {

    	// Stopper prevents additional email tips from appearing multiple times
    	let stopper = 0;

    	// Removes red warnings in realtime after user enters correct information
    	$(mail).on('keyup blur', function() {
    		if (isValidEmailAddress(this.value)) {
    			$(mail).removeClass("needs-attention");
    			$("#email-tip").toggle(false);
    			$("#mail-error").toggle(false);
    			mailIsValid = true;
    		}
    	});

   	    $(mail).blur(function() {

   	    	// Check if mail field is blank
   			if (this.value === "") {

   				$(this).addClass("needs-attention");
   				$(this).attr("placeholder", "Please enter your e-mail address");
   				
   				//Hide mail tip if it's already there
   				$("#email-tip").toggle(false);
   				mailIsValid = false;
   				stopper = 0;
   			} 

   			// Check if email format is valid
   			else if( isValidEmailAddress( this.value ) ) { 
   				$(mail).removeClass("needs-attention");
   				$("#email-tip").toggle(false);
   			 }

   			else if (stopper < 1) {

   				$(mail).after("<div id='email-tip' style='color:red;margin-bottom: 20px;'>Please enter a valid email address</div>");
   				$(this).addClass("needs-attention");
   				mailIsValid = false;
   				stopper = 1;
	   		}
		});
    }

	function otherJob() {

		// Stopper prevents additional input fields being created if user selects "other" multiple times
		let stopper = 0;

		$('#title').change(function() {
			
			if (($( "#title option:selected" ).text() === "Other") && (stopper === 0)) {
				const titleInput = document.createElement('input');
				$(titleInput).attr("id", "other-title");
				$(titleInput).attr("placeholder", "Your Job Role");
				$('#titleInput').append(titleInput);
				stopper = 1;
			}
		});
	}

	function tShirtColor() {

		$('#design').change(function() {

			$('label[for="color"]').toggle(true);
			$('#color').toggle(true);

			// If the user selects "Theme - JS Puns" then the color menu should only 
			// display "Cornflower Blue," "Dark Slate Grey," and "Gold."
			if ($( "#design option:selected" ).text() === "Theme - JS Puns") {

				$('#color').empty();
				$('#color').append($('<option>', {value: 'cornflowerblue', text: 'Cornflower Blue'}));
				$('#color').append($('<option>', {value: 'darkslategrey', text: 'Dark Slate Grey'}));
				$('#color').append($('<option>', {value: 'gold', text: 'Gold'}));
			}	

			// If the user selects "Theme - I ♥ JS" then the color menu should only 
			// display "Tomato," "Steel Blue," and "Dim Grey."	
			if ($( "#design option:selected" ).text() === "Theme - I ♥ JS") {

				$('#color').empty();
				$('#color').append($('<option>', {value: 'tomato', text: 'Tomato'}));
				$('#color').append($('<option>', {value: 'steelblue', text: 'Steel Blue'}));
				$('#color').append($('<option>', {value: 'dimgrey', text: 'Dim Grey'}));
			}
		});
	}

	function registerForActivities() {

		// Keep track of total dollar amount of conferences and workshops
		let tracker = 0;

		// Display total cost below the list of checkboxes
		const totalCost = document.createElement('p');
		totalCost.textContent = "Total: $0";
		$(activities).append(totalCost);

		$('.activities input[name="all"]').parent().change(function() {
			if (this.firstChild.checked) {
				// Hide checkbox error message if it exists
				$("#checkbox-error").toggle(false);
				$(activities).removeClass("needs-attention");
				// Add $200 to tracker
				tracker += 200;
				totalCost.textContent = "Total: $" + tracker;
				
			} else {
				// Subtract $200 from tracker
				tracker -= 200;
				totalCost.textContent = "Total: $" + tracker;
			}
		});

		// If js-frameworks checkbox is clicked
		$('.activities input[name="js-frameworks"]').parent().change(function() {

			if (this.firstChild.checked) {
				// Disable Express Worshop Field
				$('.activities input[name="express"]').parent().addClass("disabled");
				$('.activities input[name="express"]').attr("disabled", true);
				$("#checkbox-error").toggle(false);
				$(activities).removeClass("needs-attention");
				tracker += 100;
				totalCost.textContent = "Total: $" + tracker;
			} else {
				// Enable Express Worshop Field
				$('.activities input[name="express"]').parent().removeClass("disabled");
				$('.activities input[name="express"]').attr("disabled", false);
				tracker -= 100;
				totalCost.textContent = "Total: $" + tracker;
			}
		});
		
		$('.activities input[name="js-libs"]').parent().change(function() {
			
				if (this.firstChild.checked) {
				// Disable Node Worshop Field
				$('.activities input[name="node"]').parent().addClass("disabled");
				$('.activities input[name="node"]').attr("disabled", true);
				$("#checkbox-error").toggle(false);
				$(activities).removeClass("needs-attention");
				tracker += 100;
				totalCost.textContent = "Total: $" + tracker;
			} else {
				// Enable Node Worshop Field
				$('.activities input[name="node"]').parent().removeClass("disabled");
				$('.activities input[name="node"]').attr("disabled", false);
				tracker -= 100;
				totalCost.textContent = "Total: $" + tracker;
			}
		});

		$('.activities input[name="express"]').parent().change(function() {
			if (this.firstChild.checked) {
				// Disable js-frameworks Field
				$('.activities input[name="js-frameworks"]').parent().addClass("disabled");
				$('.activities input[name="js-frameworks"]').attr("disabled", true);
				$("#checkbox-error").toggle(false);
				$(activities).removeClass("needs-attention");
				tracker += 100;
				totalCost.textContent = "Total: $" + tracker;
			} else {
				// Enable js-frameworks Worshop Field
				$('.activities input[name="js-frameworks"]').parent().removeClass("disabled");
				$('.activities input[name="js-frameworks"]').attr("disabled", false);
				tracker -= 100;
				totalCost.textContent = "Total: $" + tracker;
			}
		});

		$('.activities input[name="node"]').parent().change(function() {
			if (this.firstChild.checked) {
				// Disable js-libs Field
				$('.activities input[name="js-libs"]').parent().addClass("disabled");
				$('.activities input[name="js-libs"]').attr("disabled", true);
				$("#checkbox-error").toggle(false);
				$(activities).removeClass("needs-attention");
				tracker += 100;
				totalCost.textContent = "Total: $" + tracker;
			} else {
				// Enable js-libs Worshop Field
				$('.activities input[name="js-libs"]').parent().removeClass("disabled");
				$('.activities input[name="js-libs"]').attr("disabled", false);
				tracker -= 100;
				totalCost.textContent = "Total: $" + tracker;
			}
		});

		$('.activities input[name="build-tools"]').parent().change(function() {
			if (this.firstChild.checked) {
				$("#checkbox-error").toggle(false);
				$(activities).removeClass("needs-attention");
				tracker += 100;
				totalCost.textContent = "Total: $" + tracker;
			} else {
				tracker -= 100;
				totalCost.textContent = "Total: $" + tracker;
			}
		});

		$('.activities input[name="npm"]').parent().change(function() {
			if (this.firstChild.checked) {
				$("#checkbox-error").toggle(false);
				$(activities).removeClass("needs-attention");
				tracker += 100;
				totalCost.textContent = "Total: $" + tracker;
			} else {
				tracker -= 100;
				totalCost.textContent = "Total: $" + tracker;
			}
		});
	}

	function paymentType() {
	

		const creditCard = $('#credit-card').toggle(true);
		const payPal = $('#paypal').toggle(false);
		const bitCoin = $('#bitcoin').toggle(false);


		$('#payment').change(function() {
			
			if ($( "#payment option:selected" ).text() === "Credit Card") {
				$(creditCard).toggle(true);
				$(payPal).toggle(false);
				$(bitCoin).toggle(false);
			}

			if ($( "#payment option:selected" ).text() === "PayPal") {
				$("#payment-error").toggle(false);
				$("#ccNum-error").toggle(false);
				$("#zipCode-error").toggle(false);
				$("#cvv-error").toggle(false);
				$(payPal).toggle(true);
				$(creditCard).toggle(false);
				$(bitCoin).toggle(false);
				// Nullifies having invalid credit card info if a user selects PayPal after first selecting Credit Card
				paymentIsValid = true;
			}

			if ($( "#payment option:selected" ).text() === "Bitcoin") {
				$("#payment-error").toggle(false);
				$("#ccNum-error").toggle(false);
				$("#zipCode-error").toggle(false);
				$("#cvv-error").toggle(false);
				$(bitCoin).toggle(true);
				$(creditCard).toggle(false);
				$(payPal).toggle(false);
				// Nullifies having invalid credit card info if a user selects Bitcoin after first selecting Credit Card
				paymentIsValid = true;
			}
		});
	}

	function creditValidation() {

		$("#payment").on('keyup blur', function() {
    		if (paymentIsValid) {
    			$("#payment-error").toggle(false);
    			$("#ccNum-tip").toggle(false);
    			$("#zipCode-tip").toggle(false);
    			$("#cvv-tip").toggle(false);
    		}
    	});

		if ($( "#payment option:selected" ).text() === "Credit Card") {

			paymentIsValid = false;

			$(ccNum).on('blur', function() {

	   			// Check if credit card number is an integer and the correct amount of digits	
				if ((this.value.length >= 13) && (this.value.length <= 16) && (this.value % 1 === 0)) {
					$(this).removeClass("needs-attention");
					$("#ccNum-tip").toggle(false);
					$("#ccNum-error").toggle(false);
		   			ccNumIsValid = true;
				} else {
					console.log(this.value.length);
					console.log(this.value);
					$(this).addClass("needs-attention");
	   				ccNumIsValid = false;
	   				$(this).after("<div id='ccNum-tip' style='color:red;position:absolute;margin-top:-16px;'>Invalid credit card number.</div>");
				}
			}); 

			$(zipCode).on('blur', function() {
	   			
				// Check if zip code is an integer and the correct amount of digits	
	   			if ((this.value.length === 5) && (this.value % 1 === 0)) {
					$(this).removeClass("needs-attention");
					$("#zipCode-tip").toggle(false);
					$("#zipCode-error").toggle(false);
		   			zipCodeIsValid = true;
	   			} else {
	   				$(this).addClass("needs-attention");
		   			zipCodeIsValid = false;
		   			$(this).after("<div id='zipCode-tip' style='color:red;position:absolute;margin-top:-16px;'>Invalid zip code.</div>");
	   			}
			});

			$(cvv).on('blur', function() {

	   			// Check if CVV is the correct amount of digits	and an integer
	   			if ((this.value.length === 3) && (this.value % 1 === 0)) {
					$(this).removeClass("needs-attention");
					$("#cvv-tip").toggle(false);
					$("#cvv-error").toggle(false);
		   			cvvIsValid = true;
		   		} else {
					$(this).addClass("needs-attention");
					$(this).after("<div id='cvv-tip' style='color:red;position:absolute;margin-top:-16px;'>CVV must be 3 digits.</div>");
		   			cvvIsValid = false;
		   		}

			});
		}

	} // End creditValidation()

	function submitForm() {

    	$("form").submit(function(e) {

    		if (nameIsValid === false) {
    			$(name).addClass("needs-attention");
    			e.preventDefault();
    			//Keep name error message from being appended more than once
    			if (!($("#name-error").length)) {
    				// Append name error message
    				$('button').before("<div id='name-error' style='color:red;margin-top: 5px;'>Please enter your name above.</div>");
    			}
    		}

    		if (mailIsValid === false) {
    			$(mail).addClass("needs-attention");
    			e.preventDefault();
    			//Keep mail error message from being appended more than once
    			if (!($("#mail-error").length)) {
    				// Append mail error message
    				$('button').before("<div id='mail-error' style='color:red;margin-top: 5px;'>Please enter your email address above.</div>");
    			}
    		}

    		if ($("[type=checkbox]").filter(':checked').length === 0) {
    			$(".activities").addClass("needs-attention");
    			e.preventDefault();
    			//Keep checkbox error message from being appended more than once
    			if (!($("#checkbox-error").length)) {
    				// Append checkbox error message
    				$('button').before("<div id='checkbox-error' style='color:red;margin-top: 5px;'>Please be sure to register for at least one activity.</div>");
    			}
    		}

    		// Make paymentIsValid variable true if all credit card info is true
			if (ccNumIsValid === true && cvvIsValid === true && cvvIsValid === true) {
				paymentIsValid = true;
			} 

			if ($( "#payment option:selected" ).text() === "Credit Card") {

				if (ccNumIsValid === false) {
    				$(ccNum).addClass("needs-attention");
    				e.preventDefault();
    				//Keep mail error message from being appended more than once
	    			if (!($("#ccNum-error").length)) {
	    				$(ccNum).addClass("needs-attention");
	    				// Append mail error message
	    				$('button').before("<div id='ccNum-error' style='color:red;margin-top: 5px;'>Please enter a valid credit card number.</div>"); 
    
	    			}
    			}
    		

	    		if (zipCodeIsValid === false) {
	    			$(zipCode).addClass("needs-attention");
	    			e.preventDefault();
	    			//Keep mail error message from being appended more than once
	    			if (!($("#zipCode-error").length)) {
	    				$(zipCode).addClass("needs-attention");
	    				// Append mail error message
	    				$('button').before("<div id='zipCode-error' style='color:red;margin-top: 5px;'>Please enter a 5-digit zip code.</div>"); 
	    			}
	    		}

	    		if (cvvIsValid === false) {
	    			$(cvv).addClass("needs-attention");
	    			e.preventDefault();
	    			//Keep mail error message from being appended more than once
	    			if (!($("#cvv-error").length)) {
	    				$(cvv).addClass("needs-attention");
	    				// Append mail error message
	    				$('button').before("<div id='cvv-error' style='color:red;margin-top: 5px;'>Please enter a 3-digit CVV number.</div>"); 
	    			}
	    		}
			}
		});
    }

	// When the page loads, give focus to the first text field
	$(name).eq(0).focus()

	checkName();

	checkMail();

	otherJob();

	// Hide default color menu & label
	$('label[for="color"]').toggle(false);
	$('#color').toggle(false);

	tShirtColor();

	registerForActivities();

	// Automatically set Credit Card as the default option
	$('#payment').val("credit card");

	paymentType();

	creditValidation();

	submitForm();

});




