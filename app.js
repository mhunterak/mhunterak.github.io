const display = document.getElementById("counter");
const headline = document.getElementById("headline");
const textBox = document.getElementById("input");
let inputValue = document.getElementById("input").value;
let counter = 0;


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
	counter+=1;
	display.textContent="You've tried "+counter+" colors so far.";
	headline.textContent="Maxwell Hunter's favorite color is "+inputValue;
}

function setColor(color) {
	textBox.value=color;
	reload();
}

textBox.addEventListener("click",reload());
display.textContent="You've tried 1 color so far."
