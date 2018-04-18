const display = document.getElementById("counter");
const headline = document.getElementById("headline");
const inline = document.getElementById("inline");
const textBox = document.getElementById("input");
const list = document.getElementById("list");
let inputValue = document.getElementById("input").value;
let counter = 0;
let colorList = "";


function reload() {
	let body = document.getElementById("body");
	let inputValue = document.getElementById("input").value;
	headline.style.color="dark"+inputValue;
	inline.style.backgroundColor="light"+inputValue;
	document.bgColor=inputValue;
	if (inputValue=="white"||inputValue=="yellow") {
		document.getElementById("body").style.color="black";
	} else {
		document.getElementById("body").style.color="white";
	}
	counter+=1;

	// add the new color to a list item
	let newListItem=document.createElement("li")
	newListItem.textContent=inputValue;

	// add a show button to the list item, to show that color again
	let showButton=document.createElement("button");
	showButton.textContent="show";
	newListItem.appendChild(showButton);
	showButton.addEventListener("click", () => {
		textBox.value=inputValue;
		reload();
	});

	// add a delete button to the list item
	let delButton=document.createElement("button");
	delButton.textContent="delete";
	newListItem.appendChild(delButton);
	delButton.addEventListener("click", () => {
		list.removeChild(newListItem);
	});


	list.appendChild(newListItem);

	display.textContent="You've tried "+counter+" colors so far.";
	headline.textContent="Maxwell Hunter's favorite color is "+inputValue;
}

function setColor(color) {
	textBox.value=color;
	reload();
}

textBox.addEventListener("submit",reload());
display.textContent="You've tried 1 color so far."
