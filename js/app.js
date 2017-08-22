$( document ).ready(function() {

	// Variable declarations
	const name = document.getElementById("name");
	const mail = document.getElementById("mail");
	const activities = $('.activities');

	// Regex to validate email format
	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

	// If readyToSubmit is false, the form will not submit
	let nameIsValid = false;
	let mailIsValid = false;
	let paymentVerification = false;

	function isValidName(inputName) {
		return /\w+\s+\w+/.test(inputName);
	}
   
    function checkName() {

    	// Stopper prevents additional name tips from appearing multiple times
    	let stopper = 0;

    	$(name).on('keyup blur', function() {
    		if (isValidName(this.value)) {
    			$(this).removeClass("needs-attention");
    			$("#name-tip").hide();
    			$("#name-error").hide();
    			nameIsValid = true;
    		}
    	});

   	    $(name).blur(function() {

   	    	// Check if field is empty
   	    	if (this.value === "") {

   				$(this).addClass("needs-attention");
   				$(this).attr("placeholder", "Please enter your name");
   				nameIsValid = false;
   				$("#name-tip").hide();
   				stopper = 0;

   			}

   			else if (isValidName(this.value)) {
   				$("#name-tip").hide();
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

    function isValidEmailAddress(emailAddress) {
    			return pattern.test(emailAddress);
			};	

    function checkMail () {

    	// Stopper prevents additional email tips from appearing multiple times
    	let stopper = 0;

    	// Removes red warnings in realtime after user enters correct information
    	$(mail).on('keyup blur', function() {
    		if (isValidEmailAddress(this.value)) {
    			$(mail).removeClass("needs-attention");
    			$("#email-tip").hide();
    			$("#mail-error").hide();
    			mailIsValid = true;
    		}
    	});

   	    $(mail).blur(function() {

   	    	// Check if mail field is blank
   			if (this.value === "") {

   				$(this).addClass("needs-attention");
   				$(this).attr("placeholder", "Please enter your e-mail address");
   				
   				//Hide mail tip if it's already there
   				$("#email-tip").hide();
   				mailIsValid = false;
   				stopper = 0;
   			} 

   			// Check if email format is valid
   			else if( isValidEmailAddress( this.value ) ) { 
   				$(mail).removeClass("needs-attention");
   				$("#email-tip").hide();
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

			$('label[for="color"]').show();
			$('#color').show();

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
				$("#checkbox-error").hide();
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
				$("#checkbox-error").hide();
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
				$("#checkbox-error").hide();
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
				$("#checkbox-error").hide();
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
				$("#checkbox-error").hide();
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
				$("#checkbox-error").hide();
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
				$("#checkbox-error").hide();
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

		// Automatically set Credit Card as the default option
		$('#payment option[value="credit card"]').attr("selected", "selected");

		const creditCard = $('#credit-card').show();
		const payPal = $('#paypal').hide();
		const bitCoin = $('#bitcoin').hide();


		$('#payment').change(function() {
			
			if ($( "#payment option:selected" ).text() === "Credit Card") {
				$(creditCard).show();
				$(payPal).hide();
				$(bitCoin).hide();
			}

			if ($( "#payment option:selected" ).text() === "PayPal") {
				$("#payment-error").hide();
				$(payPal).show();
				$(creditCard).hide();
				$(bitCoin).hide();
				// Nullifies having invalid credit card info if a user selects PayPal after first selecting Credit Card
				paymentVerification = true;
			}

			if ($( "#payment option:selected" ).text() === "Bitcoin") {
				$("#payment-error").hide();
				$(bitCoin).show();
				$(creditCard).hide();
				$(payPal).hide();
				// Nullifies having invalid credit card info if a user selects Bitcoin after first selecting Credit Card
				paymentVerification = true;
			}
		});
	}

	function creditValidation() {

		$("#payment").on('keyup blur', function() {
    		if (paymentVerification) {
    			$("#payment-error").hide();
    			$("#ccNum-tip").hide();
    			$("#zipCode-tip").hide();
    			$("#cvv-tip").hide();
    		}
    	});

		if ($( "#payment option:selected" ).text() === "Credit Card") {

			const ccNum = $('#cc-num');
			const zipCode = $('#zip');
			const cvv = $('#cvv');

			$(ccNum).blur(function() {

	   			// Check if credit card number is an integer and the correct amount of digits	
				if ((this.value.length >= 13) && (this.value.length <= 16) && (this.value % 1 === 0)) {
					$(this).removeClass("needs-attention");
					$("#ccNum-tip").hide();
		   			paymentVerification = true;
				} else {
					$(this).addClass("needs-attention");
	   				paymentVerification = false;
	   				$(this).after("<div id='ccNum-tip' style='color:red;position:absolute;margin-top:-16px;'>Invalid credit card number.</div>");
				}
			});


			$(zipCode).blur(function() {
	   			
				// Check if zip code is an integer and the correct amount of digits	
	   			if ((this.value.length === 5) && (this.value % 1 === 0)) {
					$(this).removeClass("needs-attention");
					$("#zipCode-tip").hide();
		   			paymentVerification = true;
	   			} else {
	   				$(this).addClass("needs-attention");
		   			paymentVerification = false;
		   			$(this).after("<div id='zipCode-tip' style='color:red;position:absolute;margin-top:-16px;'>Invalid zip code.</div>");
	   			}
			});

			$(cvv).blur(function() {

	   			// Check if CVV is an integer and the correct amount of digits	
	   			if ((this.value.length === 3) && (this.value % 1 === 0)) {
					$(this).removeClass("needs-attention");
					$("#cvv-tip").hide();
		   			paymentVerification = true;
		   		} else {
					$(this).addClass("needs-attention");
					$(this).after("<div id='cvv-tip' style='color:red;position:absolute;margin-top:-16px;'>CVV must be 3 digits.</div>");
		   			paymentVerification = false;
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

    		if (paymentVerification === false) {
    			$("#credit-card").addClass("needs-attention");
    			e.preventDefault();
    			//Keep payment error message from being appended more than once
    			if (!($("#payment-error").length)) {
    				// Append payment error message
    				$('button').before("<div id='payment-error' style='color:red;margin-top: 5px;'>Please make sure your payment information is correct.</div>");
    			}	
    		}  
		});
    }

// Execution

	// When the page loads, give focus to the first text field
	$(name).eq(0).focus()

	checkName();

	checkMail();

	otherJob();

	// Hide default color menu & label
	$('label[for="color"]').hide();
	$('#color').hide();

	tShirtColor();

	registerForActivities();

	paymentType();

	creditValidation();

	submitForm();

});




