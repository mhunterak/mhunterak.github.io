const body = document.getElementById("body");
const display = document.getElementById("counter");
const headline = document.getElementById("headline");
const inline = document.getElementById("inline");
const textBox = document.getElementById("input");
const list = document.getElementById("list");

const githubButton =document.getElementById("github");
const portfolioButton =document.getElementById("portfolio");
const resumeButton =document.getElementById("resume");
const linkedinButton =document.getElementById("linkedin");
const treehouseButton =document.getElementById("treehouse");
const calcButton =document.getElementById("calculator");
const colorsButton =document.getElementById("colors");
const cgolButton =document.getElementById("cgol");
const survivor =document.getElementById("survivor");
const weather =document.getElementById("weather");

const wait = ms => new Promise((r, j)=>setTimeout(r, ms))

function addLinkListener(buttonObject, link) {
	buttonObject.addEventListener("click", () => {
	window.open(link);
	})
}
addLinkListener(calcButton, "calc.html");
addLinkListener(colorsButton, "colors.html");
addLinkListener(cgolButton, "cgol.html");
addLinkListener(survivor, "survivor.html");
addLinkListener(weather, "weather.html");

var prom = wait(flashInterval(), 5000);
var prom = wait(spin(), 5000);

function flashInterval() {
	setInterval(function() {
		demosButton.classList.toggle('redBorder');
	}, 2000);
}


// I am available for (id=spinner)
var spinner = document.getElementById('spinner');
spinnerCounter = 0;
spinnerContentList = [
	'pro-bono work',
	'covert operations',
	'full time employment',
	'Weddings and Bar Mitzvahs',
	'touring bass guitar player gigs',
	'mercenary bug hunting contracts',
]

function spin() {
	setInterval(function() {
		if (spinnerCounter < spinnerContentList.length) {
			spinner.textContent = spinnerContentList[spinnerCounter];
			spinnerCounter += 1;
		} else {
			spinnerCounter = 0;
		}
	}, 5000);
}
