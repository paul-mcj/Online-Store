/*
 * Student Name: Paul McJannet
 * Student ID: 41171723
 * Course: CST8117 - Cross-Platform Web Design
 * Semester: Fall 2024
 * Assignment: 4 - Online Store
 * Date Submitted: Nov 24, 2024
 */

// This script will deal with the logic of opening and closing the nav menu when the hamburger button is touched on mobile devices.
const navbar = document.querySelector(".navbar");
const ham = document.getElementById("hamburger");
const navbarClose = document.getElementById("navbar-close");

// event listener to hear if hamburger icon is clicked on mobile or landscape
ham.addEventListener("click", () => {
	// change the css property of the navbar so it can be visible, and also add styling like making the flex-direction: column
	navbar.classList.add("navbar-mobile");

	// apply this css class so the close button shows
	navbarClose.classList.add("navbar-open");
});

// event listener to hear if close icon is clicked on mobile or landscape
navbarClose.addEventListener("click", () => {
	// apply special css animation when the mobile navbar closes. Since that animation is 0.5s, this timeout function will pause for the same amount of time and delay further execution of code so that the animation can play out on the navbar first
	navbar.classList.add("navbar-mobile-close");

	// after 0.5s, now do the following:
	setTimeout(() => {
		// change the css property of the navbar so it can be hidden and revert its styling and remove the animation from it
		navbar.classList.remove("navbar-mobile");
		navbar.classList.remove("navbar-mobile-close");

		// apply this css class as well so the close button reverts to hidden
		navbarClose.classList.remove("navbar-open");
	}, 500);
});
