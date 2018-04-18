const githubButton = document.getElementById("github");
const portfolioButton = document.getElementById("portfolio");
const resumeButton = document.getElementById("resume");
const linkedinButton = document.getElementById("linkedin");

githubButton.addEventListener("click", () => {
	window.open("https://github.com/mhunterak");
})
portfolioButton.addEventListener("click", () => {
	window.open("http://maxwellhunter.wixsite.com/artwork");
})
resumeButton.addEventListener("click", () => {
	window.open("https://docs.google.com/document/d/1AsHtX5zzXXFOWQEDvrKbwWHJ4jy0dN_KdqdwQcIEqIE/edit#heading=h.5rf9wr4r3no2");
})
linkedinButton.addEventListener("click", () => {
	window.open("https://www.linkedin.com/in/maxwell-hunter-6a479213/");
})

const display = document.getElementById("counter");
const headline = document.getElementById("headline");
const inline = document.getElementById("inline");
const textBox = document.getElementById("input");
const list = document.getElementById("list");
let inputValue = document.getElementById("input").value;
let counter = 0;
let colorList = "";

function reload(newList) {
	let body = document.getElementById("body");
	let inputValue = document.getElementById("input").value;
	let invert = false;
	headline.style.color="dark"+inputValue;
	inline.style.backgroundColor="light"+inputValue;
	document.bgColor=inputValue;
	if (inputValue=="white"
		||inputValue=="yellow"
		||inputValue=="pink") {
		invert = false;
		document.getElementById("body").style.color="black";
	} else {
		invert = true;
		document.getElementById("body").style.color="white";
	}

	if (newList==true) {
		counter+=1;

		// add the new color to a list item
		let newListItem=document.createElement("li")
		newListItem.id=inputValue;
		newListItem.textContent=inputValue;

		// add a show button to the list item, to show that color again
		let showButton=document.createElement("button");
		showButton.textContent="show";
		showButton.style.backgroundColor=inputValue;
		if (invert) {
			showButton.style.color="white";
		}
		newListItem.appendChild(showButton);

		// add a delete button to the list item
		let delButton=document.createElement("button");
		delButton.textContent="delete";
		delButton.style.backgroundColor=inputValue;
		if (invert) {
			delButton.style.color="white";
		}
		newListItem.appendChild(delButton);

		list.appendChild(newListItem);
	}
	display.textContent="You've tried "+counter+" colors so far.";
	headline.textContent="Maxwell Hunter's favorite color is "+inputValue;
}

// handle click events on the parent node, with event bubbling
list.addEventListener("click", (e) => {
	if (e.target.tagName === 'BUTTON') {
		if (e.target.textContent === 'delete') {
		let child=e.target.parentNode;
		list.removeChild(child);
		}
	else if (e.target.textContent === 'show') {
			textBox.value=e.target.parentNode.id;
			reload(false);
		}
	}
});

textBox.addEventListener("submit",reload(true));
display.textContent="You've tried 1 color so far."
