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

const demosButton = document.getElementById("demosButton");
const demos = document.getElementById("demos");
demos.hidden = true;


const wait = ms => new Promise((r, j)=>setTimeout(r, ms))

demosButton.addEventListener("mouseover",()=>{
	if (demos.hidden) {
			demosButton.textContent = "JAVASCRIPT DEMOS ▼"
			demos.hidden = false;
		}})
inline.addEventListener("mouseover", ()=> {
	if (demos.hidden) {} else {
			demosButton.textContent = "JAVASCRIPT DEMOS ▶"
			demos.hidden = true;
		}})

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

function flashInterval() {
	setInterval(function() {
    	demosButton.classList.toggle('redBorder');
	}, 2000);
}




