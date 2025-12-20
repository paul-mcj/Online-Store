// get all html elements that will need to be validated on the client side
const contactFullName = document.getElementById("contact-full-name");
const contactPhone = document.getElementById("contact-phone");
const contactEmail = document.getElementById("contact-email");
const contactEmailReenter = document.getElementById("contact-email-reenter");
const contactBirth = document.getElementById("contact-birth");
const contactComments = document.getElementById("contact-comments");
const contactConsent = document.getElementById("contact-consent");
const contactConsentLabel = document.getElementById("contact-consent-label");
const contactSubmit = document.getElementById("contact-submit");
const contactUsForm = document.getElementById("contact-us-form");

// false properties initially set up for form validation in this global object (each value is updated when input event listeners become valid)
const finalFormValidity = {
	fullNameFormValidator: false,
	phoneFormValidator: false,
	emailFormValidator: false,
	emailReenterFormValidator: false,
	birthFormValidator: false,
	commentsFormValidator: false,
	consentFormValidator: false
};

// this function handles validity and can determine if inputs match specific conditions (argument passed in from specific event called functions) and will update UI based on element
const validatorHandler = (condition, element, placeholderText) => {
	// if condition is true, its valid
	if (condition) {
		// remove any invalid styles (if any) and reset input
		element.placeholder = "";
		element.classList.remove("is-invalid");
		element.classList.remove("placeholder-text-invalid");

		// specifically styling contactConsentLabel
		if (element === contactConsentLabel) {
			// hide the link for "Terms & Conditions"
			contactConsentLabel.firstElementChild.classList.add(
				"hide-terms"
			);
			// make sure not show it
			contactConsentLabel.firstElementChild.classList.remove(
				"show-terms"
			);
			// show the <p> instead
			contactConsentLabel.lastElementChild.classList.add("show-terms");
			// make sure is is not hidden!
			contactConsentLabel.lastElementChild.classList.remove(
				"hide-terms"
			);
		}

		// add valid styles
		element.classList.add("is-valid");
		element.classList.add("text-valid");

		return true;
	}

	// if condition isn't met, apply these styles for invalidation
	else {
		// remove any valid styles (if any) and reset input
		element.value = "";
		element.classList.remove("is-valid");
		element.classList.remove("placeholder-text-valid");

		// add message as placeholder
		element.placeholder = placeholderText;

		// specifically styling contactConsentLabel
		if (element === contactConsentLabel) {
			// show the link for "Terms & Conditions"
			contactConsentLabel.firstElementChild.classList.add(
				"show-terms"
			);
			// make sure to actually show it
			contactConsentLabel.firstElementChild.classList.remove(
				"hide-terms"
			);
			// hide the <p> instead
			contactConsentLabel.lastElementChild.classList.add("hide-terms");
			// make sure is is hidden!
			contactConsentLabel.lastElementChild.classList.remove(
				"show-terms"
			);
		}

		// add invalid styles
		element.classList.add("is-invalid");
		element.classList.add("placeholder-text-invalid");

		return false;
	}
};

// since I cannot guarantee that individual values of the finalFormValidity object will be updated *before* the form event listener looks at this object for validation (ie. there is no scheduled state updates without the use of external library/framework), I need to use this function in those individual event listeners so that the entire finalFormValidity object is *correctly updated first* before the entire form can be validated.
const updateFinalFormValidityObject = (
	objName,
	condition,
	element,
	placeholder
) => {
	finalFormValidity[objName] = validatorHandler(
		condition,
		element,
		placeholder
	);
};

// Validation Functions

// checks if name is valid
const isValidFullName = (name) => {
	// if name exists, is at least one character and less than 100 characters
	const condition =
		name && name.trim().length >= 1 && name.trim().length < 100;

	const placeholderText = "At least one character required";

	// grab specific key name in finalFormValidity object
	let objName = Object.keys(finalFormValidity)[0];

	// pass condition and target input element id to validator function, which will return if the value for the input field is valid or not
	updateFinalFormValidityObject(
		objName,
		condition,
		contactFullName,
		placeholderText
	);
};

// checks if phone number is valid
const isValidPhone = (phoneNum) => {
	// since input is a string, lets convert to an integer
	const convertedNumber = parseInt(phoneNum);

	// if phone number is exactly 10 digits (ie. integers only)
	const condition = convertedNumber && phoneNum.trim().length === 10;

	// since condition checks for an integer, if a user inputs all zeros it becomes falsy -- lets cover that potential case as well before sending place holder text:
	let placeholderText =
		parseInt(phoneNum) === 0
			? "Number cannot be just zero(s)"
			: "Please enter exactly 10 digits";

	// grab specific key name in finalFormValidity object
	let objName = Object.keys(finalFormValidity)[1];

	// pass condition and target input element id to validator function, which will return if the value for the input field is valid or not
	updateFinalFormValidityObject(
		objName,
		condition,
		contactPhone,
		placeholderText
	);
};

//  checks if email is valid
const isValidEmail = (email) => {
	/***************************************************************************************
	 *    The following regular expression is sourced from this webpage (note: there were slight modifications made to meet the criteria specified in the assignment):
	 *    Title: JavaScript: HTML Form - email validation
	 *    Author: w3resource
	 *    Date: Last updated August 19, 2022
	 *    Availability: https://www.w3resource.com/javascript/form/email-validation.php
	 ***************************************************************************************/
	if (
		typeof email === "string" &&
		// must start with alphabetic char and have 2 or more chars, then @ symbol, and end with a period with either 2 or 3 chars after
		/^[a-zA-Z]+([\.-]?\w+){2,}@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
	) {
		// argument must not only match regular expression to return true, but must also be a string
		return true;
	} else return false;
};

// check is re-entered email is valid
const isValidEmailReenter = (email) => {
	// just compare whats in the actual email field to whats in the re-enter field
	const condition = contactEmail.value && email === contactEmail.value;

	const placeholderText = "Email doesn't match above";

	// grab specific key name in finalFormValidity object
	let objName = Object.keys(finalFormValidity)[3];

	// pass condition and target input element id to validator function, which will return if the value for the input field is valid or not
	updateFinalFormValidityObject(
		objName,
		condition,
		contactEmailReenter,
		placeholderText
	);
};

// checks if age of user is valid
const isAgeOfMajority = (birthYear, birthMonth, birthDay) => {
	let forBirthdateVar;

	const bY = parseInt(birthYear);
	const bM = parseInt(birthMonth);
	const bD = parseInt(birthDay);

	// stipulations for all arguments to fit in a certain range
	if (bY < 1920 || bY > 2010 || bM < 1 || bM > 12 || bD < 1 || bD > 31) {
		return false;
	}
	// update our let placeholder by concatenating valid number values into a template string representing "M/D/YYYY"
	else forBirthdateVar = `${bM}/${bD}/${bY}`;

	/* 1. There are a few values that can be returned from the new Date() constructor:
	- If no arguments are passed in it will return the current date (which is useful for the "const TODAY")
	- If an int is passed in, that will create a date that is a specific amount of milliseconds since Jan 1, 1970
	- If a string is passed in, it can create a date based upon the year, month and day.*/
	const TODAY = new Date();
	/* 2. Passing the number values into the new Date() constructor will work (as long as year and month are specified), however, if nothing else is then defaults will be chosen, meaning that if certain arguments are not passed to the function the result will not be what is expected. Formatting it into a string first then passing it to the new Date() constructor makes it easier to be interpreted as a single argument to create a date object.*/
	// pass template string into constructor
	var birthdate = new Date(forBirthdateVar);

	/***************************************************************************************
	 *    The following code about determining a difference between two dates is sourced from this webpage (note: there were slight modifications made to the values):
	 *    Title: How to Calculate the Number of Days between Two Dates in JavaScript?
	 *    Author: geeksforgeeks
	 *    Date: Last updated October 7, 2024
	 *    Availability: https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
	 ***************************************************************************************/
	// Calculating the time difference of two dates
	let difference_between_dates = Math.round(
		(TODAY.getTime() - birthdate.getTime()) / (1000 * 3600 * 24)
	);

	// if the difference between TODAY and birthdate is more than 6570 days (or 18 years) return true -- this will implicitly return false otherwise
	return difference_between_dates > 6570;
};

// checks if comment textarea is valid
const isValidComments = (message) => {
	// if message exists and is at least three characters
	const condition = message && message.trim().length >= 3;

	const placeholderText = "At least three characters required";

	// grab specific key name in finalFormValidity object
	let objName = Object.keys(finalFormValidity)[5];

	// pass condition and target input element id to validator function, which will return if the value for the input field is valid or not
	updateFinalFormValidityObject(
		objName,
		condition,
		contactComments,
		placeholderText
	);
};

// Event Listeners

contactFullName.addEventListener("blur", (e) => {
	isValidFullName(e.target.value);
});

contactPhone.addEventListener("blur", (e) => {
	isValidPhone(e.target.value);
});

contactEmail.addEventListener("blur", (e) => {
	// use helper function to determine email validity:
	const condition = isValidEmail(e.target.value);

	let placeholderText = "Format: 'example@domain.com'";

	// grab specific key name in finalFormValidity object
	let objName = Object.keys(finalFormValidity)[2];

	// pass condition and target input element id to validator function, which will return if the value for the input field is valid or not
	updateFinalFormValidityObject(
		objName,
		condition,
		contactEmail,
		placeholderText
	);
});

contactEmailReenter.addEventListener("blur", (e) => {
	isValidEmailReenter(contactEmailReenter.value);
});

contactBirth.addEventListener("blur", (e) => {
	// get string value of date and convert it into an array with three elements (year, month, date respectively)
	let dateComponents = e.target.value.split("-");

	// use helper function to determine age of user using the above array indexes:
	const condition = isAgeOfMajority(
		dateComponents[0],
		dateComponents[1],
		dateComponents[2]
	);

	let placeholderText = "You are not old enough";

	// since input elements with type=date do not allow for placeholder text, I will simply use an alert message to let users know that they are not old enough if the condition is not met
	if (!condition) {
		window.alert(placeholderText);
	}

	// grab specific key name in finalFormValidity object
	let objName = Object.keys(finalFormValidity)[4];

	// pass condition and target input element id to validator function, which will return if the value for the input field is valid or not
	updateFinalFormValidityObject(
		objName,
		condition,
		contactBirth,
		placeholderText
	);
});

contactComments.addEventListener("blur", (e) => {
	isValidComments(e.target.value);
});

contactConsent.addEventListener("change", (e) => {
	// see if box is checked
	const condition = e.target.checked;
	console.log(condition);
	console.log(!condition);

	const placeholderText =
		"To send us a message, you must agree to Terms & Conditions";

	// Use alert message to let users know that they must consent to terms and conditions
	if (!condition) {
		window.alert(placeholderText);
	}

	// grab specific key name in finalFormValidity object
	let objName = Object.keys(finalFormValidity)[6];

	// pass condition and target input element id to validator function, which will return if the value for the input field is valid or not
	updateFinalFormValidityObject(
		objName,
		condition,
		contactConsentLabel,
		placeholderText
	);
});

contactUsForm.addEventListener("submit", (e) => {
	// do not submit data
	e.preventDefault();

	// show success message
	window.alert("Thank-you for your message! We will contact you shortly");

	// get all input fields
	elementArr = [
		contactFullName,
		contactPhone,
		contactEmail,
		contactEmailReenter,
		contactBirth,
		contactComments,
		contactConsent
	];

	// reset all fields and remove valid classes
	elementArr.forEach((item) => {
		// specifically for the checkbox
		if (item === contactConsent) {
			contactConsent.checked = false;
			// show the link for "Terms & Conditions"
			contactConsentLabel.firstElementChild.classList.add(
				"show-terms"
			);
			// make sure to actually show it
			contactConsentLabel.firstElementChild.classList.remove(
				"hide-terms"
			);
			// hide the <p> instead
			contactConsentLabel.lastElementChild.classList.add("hide-terms");
			// make sure is is hidden!
			contactConsentLabel.lastElementChild.classList.remove(
				"show-terms"
			);
		} else {
			item.value = "";
			item.classList.remove("text-valid");
			item.classList.remove("is-valid");
		}
	});

	// reset submit button to disabled
	contactSubmit.classList.add("disabled");
	contactSubmit.setAttribute("disabled", "true");
	contactSubmit.setAttribute("aria-disabled", "true");
});
