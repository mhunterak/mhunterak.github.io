const display = document.getElementById("display");
const buttons = document.getElementById("buttons");

const button1 = document.getElementById("1");
const button2 = document.getElementById("2");
const button3 = document.getElementById("3");
const button4 = document.getElementById("4");
const button5 = document.getElementById("5");
const button6 = document.getElementById("6");
const button7 = document.getElementById("7");
const button8 = document.getElementById("8");
const button9 = document.getElementById("9");
const button0 = document.getElementById("0");
const buttonPoint = document.getElementById(".");
const buttonTimes = document.getElementById("*");
const buttonDivide = document.getElementById("/");
const buttonPlus = document.getElementById("+");
const buttonMinus = document.getElementById("-");
const buttonEquals = document.getElementById("=");

let firstNumber=null;
let secondNumber=null;
let sum=0;
let action = "";

const numberWithCommas = (x) => {
	array = x.toString().split(".");
	if (array.length < 2) {
		return array[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	} else if (array.length < 3) {
		return array[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"."+array[1]
	}
}

function doMath(buttonid) {
	// if button is not a number
	if (isNaN(buttonid)) {
		console.log("not a number")
		if (buttonid==="c") {
			firstNumber=null;
			secondNumber=null;
			action="";
			display.textContent="0";
		} else if (buttonid=="=" && secondNumber=== null) {
			// do nothing
		} else if (firstNumber===null) {
			// if a number hasn't been entered yet, do nothing
		} else if (action===null) { 
			// if a number has been entered, save the math sign
			action=buttonid;
			display.textContent=firstNumber+" "+action;
		} else if (secondNumber===null) {
			action=buttonid;
			display.textContent = firstNumber+" "+action

		} else {
			if (buttonid==="=") {
					console.log("button is =")
					if (secondNumber==null) {
					
					} else {
						if (action==="+") {
							sum = firstNumber + secondNumber;
							display.textContent = numberWithCommas(firstNumber)+" "+action+" "+numberWithCommas(secondNumber)+" "+"= "+numberWithCommas(sum);
						} else if (action==="-") {
							sum = firstNumber - secondNumber;
							display.textContent = numberWithCommas(firstNumber)+" "+action+" "+numberWithCommas(secondNumber)+" "+"= "+numberWithCommas(sum);
						} else if (action==="*") {
							sum = firstNumber * secondNumber;
							display.textContent = numberWithCommas(firstNumber)+" "+action+" "+numberWithCommas(secondNumber)+" "+"= "+numberWithCommas(sum);
						} else if (action==="/") {
							sum = parseFloat(firstNumber) / parseFloat(secondNumber);
							if (parseFloat(sum)==parseInt(sum)) {
								display.textContent = numberWithCommas(firstNumber)+" "+action+" "+numberWithCommas(secondNumber)+" "+"= "+numberWithCommas(sum);
							} else {
								display.textContent = (firstNumber)+" "+action+" "+(secondNumber)+" "+"= "+numberWithCommas(sum);

							}

						}
						firstNumber=sum;
						secondNumber=null;
						sum=0.0
						action="";
					}
						
			}
		}
	// if button is a number
	} else {
		console.log("is a number")
		if (sum===0) {
			if (firstNumber === null) {
				firstNumber = parseInt(buttonid);
				display.textContent = numberWithCommas(firstNumber);
			} else if (action==="") {
				newNumber = (firstNumber.toString()+buttonid.toString());
				firstNumber=newNumber;
				display.textContent = numberWithCommas(firstNumber);
			} else {
				if (secondNumber===null) {

					secondNumber = parseInt(buttonid);
					display.textContent = numberWithCommas(firstNumber)+" "+action+" "+numberWithCommas(secondNumber);
				} else {
					newNumber = (secondNumber.toString()+buttonid.toString());
					secondNumber = newNumber;
					display.textContent = numberWithCommas(firstNumber)+" "+action+" "+numberWithCommas(secondNumber);
				}
			}
		} else {
			firstNumber = parseInt(buttonid);
			sum=0;
			display.textContent = numberWithCommas(firstNumber);
		}
	}
}
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    let disabled = false; {
	    if (e.keyCode >= 96 && e.keyCode <= 105) {
	        console.log(e.keyCode - 96);
	        doMath(parseInt(e.keyCode - 96));
	    } else if (e.keyCode >= 48 && e.keyCode <= 57) {
	        console.log(e.keyCode - 48);
	        doMath(parseInt(e.keyCode - 48));
	    } else if (e.keyCode == 187) {
	    	// plus
			doMath("+");
	    } else if (e.keyCode == 189) {
	    	// minus
			doMath("-");
	    } else if (e.keyCode == 88) {
	    	// times
			doMath("*");
	    } else if (e.keyCode == 191) {
	    	// divide
			doMath("/");
	    } else if (e.keyCode == 13) {
	    	// equals
			doMath("=");
	    }
	}
}

// TODOs
/*
FEATURE REQUESTS
needs a decimal button for numbers 0<i<1

BUGLIST
-after pressing equals to get a sum, pressing number buttons just adds numbers
to the end of the sum. instead, it should overwrite the first number.
-commas not showing on sum
-equals should erase the action character



*/

buttons.addEventListener("click", (e)=>{
	if (e.target.tagName === "BUTTON") {
		doMath(e.target.id);
	}
})

display.textContent="00.0";
