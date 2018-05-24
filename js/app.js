const body = document.getElementById("body");
const display = document.getElementById("counter");
const headline = document.getElementById("headline");
const inline = document.getElementById("inline");
const textBox = document.getElementById("input");
const list = document.getElementById("list");
let inputValue = document.getElementById("input").value;
let counter = 0;
let colorList = "";

body.style.transition = "all 2s";
body.style.webkitTransition = "all 2s;"

inline.style.transition = "all 2s";
inline.style.webkitTransition = "all 2s;"

headline.style.transition = "all 2s";
headline.style.webkitTransition = "all 2s;"

function reload(newList) {
	let inputValue = textBox.value;
	let invert = false;
	headline.style.color="dark"+inputValue;
	inline.style.backgroundColor="light"+inputValue;
	document.bgColor=inputValue;
	if (inputValue=="white"
		||inputValue=="red"
		||inputValue=="yellow"
		||inputValue=="pink") {
		invert = false;
		body.style.color="black";
		body.style.textShadow = "0 0 5px white";
		for (let i=0; i<nav.children.length; i+=1) {
			if (nav.children[i].tagName === 'BUTTON') {
				nav.children[i].style.boxShadow = "0 0 5px black";
			}
		}

	} else {
		invert = true;
		body.style.color="white";
		body.style.textShadow = "0 0 5px black";
		for (let i=0; i<nav.children.length; i+=1) {
			if (nav.children[i].tagName === 'BUTTON') {
				nav.children[i].style.boxShadow = "";
			}
		}
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

// used to set a listener to change the color on mouseover
function addButtonListeners(buttonObject, color, link) {
	buttonObject.addEventListener("mouseover",()=>{
		if (textBox.value!=color) {
			textBox.value=color;
			reload(true);
			}
		})
	buttonObject.addEventListener("click", () => {
		window.open(link);
		})
	}

textBox.addEventListener("submit",reload(true));
display.textContent="You've tried 1 color so far."

const githubButton = document.getElementById("github");
const portfolioButton = document.getElementById("portfolio");
const resumeButton = document.getElementById("resume");
const linkedinButton = document.getElementById("linkedin");
const treehouseButton = document.getElementById("treehouse");
const calcButton = document.getElementById("calculator");
const cgolButton = document.getElementById("cgol");

addButtonListeners(githubButton, "red", "https://github.com/mhunterak");
addButtonListeners(portfolioButton, "yellow", "http://maxwellhunter.wixsite.com/artwork");
addButtonListeners(resumeButton, "green", "https://docs.google.com/document/d/1AsHtX5zzXXFOWQEDvrKbwWHJ4jy0dN_KdqdwQcIEqIE/edit#heading=h.5rf9wr4r3no2");
addButtonListeners(linkedinButton, "blue", "https://www.linkedin.com/in/maxwell-hunter-6a479213/");
addButtonListeners(treehouseButton, "purple", "https://teamtreehouse.com/maxwellhunter");
addButtonListeners(calcButton, "black", "calc.html");
addButtonListeners(cgolButton, "white", "cgol.html");

reload();

