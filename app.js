const githubButton = document.getElementById("github");
const portfolioButton = document.getElementById("portfolio");
const resumeButton = document.getElementById("resume");
const linkedinButton = document.getElementById("linkedin");

const display = document.getElementById("counter");
const headline = document.getElementById("headline");
const inline = document.getElementById("inline");
const textBox = document.getElementById("input");
const list = document.getElementById("list");
let inputValue = document.getElementById("input").value;
let counter = 0;
let colorList = "";

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
	counter+=1;

	if (newList) {

		// add the new color to a list item
		let newListItem=document.createElement("li")
		newListItem.textContent=inputValue;

		// add a show button to the list item, to show that color again
		let showButton=document.createElement("button");
		showButton.textContent="show";
		showButton.style.backgroundColor=inputValue;
		if (invert) {
			showButton.style.color="white";
		}
		newListItem.appendChild(showButton);
		showButton.addEventListener("click", () => {
			textBox.value=inputValue;
			reload();
		});

		// add a delete button to the list item
		let delButton=document.createElement("button");
		delButton.textContent="delete";
		delButton.style.backgroundColor=inputValue;
		if (invert) {
			delButton.style.color="white";
		}
		newListItem.appendChild(delButton);
		delButton.addEventListener("click", () => {
			list.removeChild(newListItem);
		});


		list.appendChild(newListItem);
	}
	display.textContent="You've tried "+counter+" colors so far.";
	headline.textContent="Maxwell Hunter's favorite color is "+inputValue;
}

function setColor(color) {
	textBox.value=color;
	reload(false);
}

textBox.addEventListener("submit",reload(true));
display.textContent="You've tried 1 color so far."
