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
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function doMath(button) {
	// if button is not a number
	if (isNaN(parseInt(button.id))) {
		console.log("not a number")
		if (button.id==="c") {
			firstNumber=null;
			secondNumber=null;
			action="";
			display.textContent="0";
		} else if (button.id=="=" && secondNumber=== null) {
			// do nothing
		} else if (firstNumber===null) {
			// if a number hasn't been entered yet, do nothing
		} else if (action===null) { 
			// if a number has been entered, save the math sign
			action=button.id;
			display.textContent=firstNumber+" "+action;
		} else if (secondNumber===null) {
			action=button.id;
			display.textContent = firstNumber+" "+action

		} else {
			if (button.id==="=") {
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
								display.textContent = (firstNumber)+" "+action+" "+(secondNumber)+" "+"= "+(sum);

							}

						}
						firstNumber=sum;
						secondNumber=null;
						action="";
					}
						
			}
		}
	// if button is a number
	} else {
		console.log("is a number")
		if (sum===0) {
			if (firstNumber === null) {
				firstNumber = parseInt(button.id);
				display.textContent = numberWithCommas(firstNumber);
			} else if (action==="") {
				newNumber = (firstNumber.toString()+button.id.toString());
				firstNumber=newNumber;
				display.textContent = numberWithCommas(firstNumber);
			} else {
				if (secondNumber===null) {

					secondNumber = parseInt(button.id);
					display.textContent = numberWithCommas(firstNumber)+" "+action+" "+numberWithCommas(secondNumber);
				} else {
					newNumber = (secondNumber.toString()+button.id.toString());
					secondNumber = newNumber;
					display.textContent = numberWithCommas(firstNumber)+" "+action+" "+numberWithCommas(secondNumber);
				}
			}
		} else {
			firstNumber = parseInt(button.id);
			sum=0;
			display.textContent = numberWithCommas(firstNumber);

		}
	}
}
	 

buttons.addEventListener("click", (e)=>{
	if (e.target.tagName === "BUTTON") {
		doMath(e.target);
	}
})

display.textContent="00.0";
