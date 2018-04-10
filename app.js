const headline = document.getElementById("headline");
const textBox = document.getElementById("input");
let inputValue= document.getElementById("input").value;

function reload() {
	let body = document.getElementById("body");
	let inputValue = document.getElementById("input").value;
	headline.style.color="dark"+inputValue;
	document.bgColor=inputValue;
	if (inputValue=="white"||inputValue=="yellow") {
		document.getElementById("body").style.color="black";
	} else {
		document.getElementById("body").style.color="white";

	}
}

function setColor(color) {
	textBox.value=color;
	reload();
}

textBox.addEventListener("click",reload());