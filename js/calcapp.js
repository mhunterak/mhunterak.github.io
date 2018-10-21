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

/* TODO: make decimcal button display, work */
const buttonPoint = document.getElementById(".");

const buttonC = document.getElementById("c");

const buttonTimes = document.getElementById("*");
const buttonDivide = document.getElementById("/");
const buttonPlus = document.getElementById("+");
const buttonMinus = document.getElementById("-");

const buttonEquals = document.getElementById("=");

let firstNumber = null;
let secondNumber = null;
let sum = 0.0;
let action = null;

/* the fragile state is turned on after pressing =.
if you press a number, it will reset the firstNumber 
and overwrite with the number you entered.
disabled by default.
*/
let fragile = false;

let history= new Array();
// looks like [firstNumber, action, secondNumber, sum]

// formats numbers to have commas on the digits, but not the decimals
const numberWithCommas = (x) => { // takes a int or string
    // split input at the decimal
    if (x===null) {
        return x
    }
    array = x.toString().split(".");
    // if its an integer, array length will only be 1
    if (array.length < 2) {
        // add a comma every third number from the end
        return array[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    // if there is a decimal
    } else if (array.length < 3) {
        // only perform that operation on the first part of the array
        return array[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + array[1]
    }
}

// sets the display with a string
function setDisplay(string) {
    display.textContent = string;
}

// gets available global variables and contructs a display string
function updateDisplay() {
    let displayString = ""
    if (!!firstNumber) {
        displayString += numberWithCommas(firstNumber);
    }
    if (!!action) {
        displayString += " " + action;
    }
    if (displayString.length < 1) {
        setDisplay("00.00");
    } else {
        setDisplay(displayString);}
    if (!!secondNumber) {
        calculate(action, firstNumber, secondNumber, sum);
    }

}


function calculate(action, firstNumber, secondNumber, sum) {
    if (action === "+") {
        sum = parseFloat(firstNumber) + parseFloat(secondNumber);
        setDisplay(numberWithCommas(firstNumber) + " " + action + " " + numberWithCommas(secondNumber) + " " + "= " + numberWithCommas(sum));
    } else if (action === "-") {
        sum = parseFloat(firstNumber) - parseFloat(secondNumber);
        setDisplay(numberWithCommas(firstNumber) + " " + action + " " + numberWithCommas(secondNumber) + " " + "= " + numberWithCommas(sum));
    } else if (action === "*") {
        sum = parseFloat(firstNumber) * parseFloat(secondNumber);
        setDisplay(numberWithCommas(firstNumber) + " " + action + " " + numberWithCommas(secondNumber) + " " + "= " + numberWithCommas(sum));
    } else if (action === "/") {
        sum = parseFloat(firstNumber) / parseFloat(secondNumber);
        if (parseFloat(sum) === parseInt(sum)) {
            display.textContent = numberWithCommas(firstNumber) + " " + action + " " + numberWithCommas(secondNumber) + " = " + numberWithCommas(sum);
        } else {
            display.textContent = numberWithCommas(firstNumber) + " " + action + " " + numberWithCommas(secondNumber) + " = " + numberWithCommas(sum);
        }
    }
    return sum
}
// main math function that performs the calculator function
// controls which action is performed when a button is pushed
function doMath(buttonid) {
    // if button is not a number
    if (isNaN(buttonid)) {
        console.log("Button is not a number")
        if (buttonid === "") {
            // ignore buttons that have no ID
        } else if (buttonid == "<") {
            if (secondNumber == null) {
                numberArray = firstNumber.toString().split("");
                numberArray.pop(-1);
                firstNumber=numberArray.join("");
                setDisplay(numberWithCommas(firstNumber));
            } else {
                numberArray = secondNumber.toString().split("");
                numberArray.pop(-1);
                secondNumber=parseInt(numberArray.join(""));
                setDisplay(numberWithCommas(firstNumber)+" "+action+" "+secondNumber.toString());
            } 
        } else if (buttonid === ".") {
            // TODO: Add functionality to the decimal button
            // if secondNumber is not null, we're adding the decimal to the secondNumber
            if (!!secondNumber) {

            // if secondNumber is null, we're adding the decimal to the firstNumber    
            } else {

            }
            alert('The Decimal button is out of order. sorry!');
        } else if (buttonid === "c") {
            firstNumber = null;
            secondNumber = null;
            action = null;
            display.textContent = "00.00";
        } else if (buttonid === "=" && action === null) {
            // do nothing, we don't have a math operator
        } else if (buttonid === "=" && secondNumber === null) {
            // TODO: repeat the last action - works the first time, needs to work after that
            // firstNumber is already in position
            sum = calculate(history[0][1], firstNumber, history[0][2], firstNumber)
            history.unshift([firstNumber, history[0][1], secondNumber, sum]);
            firstNumber=sum;
            secondNumber=null;
            action=null; 
            setDisplay(numberWithCommas(firstNumber));
            fragile=true;
        } else if (firstNumber === null) {
            // if a number hasn't been entered yet, do nothing
        } else if ('+-*/'.indexOf(buttonid)>=0) {
            // if a number has been entered, save the math sign
            fragile = false;
            action = buttonid;
            if (secondNumber === null) {
                display.textContent = numberWithCommas(firstNumber) + " " + action
             } else {
                display.textContent = numberWithCommas(firstNumber) + " " + action + " " + numberWithCommas(secondNumber);
            }
        } else if (secondNumber === null) {
            action = secondNumber=parseInt(buttonid);
            setDisplay(numberWithCommas(firstNumber) + " " + action);

// TODO: UX plan.
/* as soon as we have a secondNumber and a math operator, we should show the 
sum. The equals button will then move the sum to be the new first number, and
start a new operation.
*/
        // the only other non-number button is equals
        } else {
            // When Pressing the equals sign
            if (buttonid === "=") {
                console.log("button is =")
                history.unshift([firstNumber, action, secondNumber, sum]);
                firstNumber=sum;
                secondNumber=null;
                action=null; 
                setDisplay(numberWithCommas(firstNumber));
                fragile=true;
//                    sum = calculate(action, firstNumber, secondNumber, sum);
                
            }
        }
    // if button is a number
    } else {
        console.log("is a number")
        // UNLESS fragile is true, erase everything and this is the firstNumber
        if (fragile === true) {
            fragile = false;
            firstNumber = null;
            doMath(buttonid);

        // if firstNumber is null, No numbers have been entered yet
        // set the firstNumber to the button ID
        } else if (firstNumber === null) {
            firstNumber = parseInt(buttonid);
            setDisplay(numberWithCommas(firstNumber));
        } else if (action === null) {
            newNumber = (firstNumber.toString() + buttonid);
            firstNumber = newNumber;
            setDisplay(numberWithCommas(firstNumber));
        } else {
            // if a secondNumber doesn't exist,
            if (secondNumber === null) {
                // create a value for the second number
                secondNumber = parseInt(buttonid);
                sum = calculate(action, firstNumber, secondNumber, sum);
            // if a secondNumber exists, add the number by string concatenation
            } else {
                newNumber = parseInt(secondNumber.toString() + buttonid);
                secondNumber=newNumber;
                sum = calculate(action, firstNumber, secondNumber, sum);
            }
        }
    }
}


// if a key is pressed, check for shortcut keys
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    console.log(e.key)
    let disabled = false; {
        if (parseInt(e.key)<10) {
            doMath(parseInt(e.key));
        } else if (e.key === '+') {
            // plus
            doMath("+");
        } else if (e.key === '-') {
            // minus
            doMath("-");
        } else if (e.key === 'x') {
            // times
            doMath("*");
        } else if (e.key === '/') {
            // divide
            doMath("/");
        } else if (['=','Enter'].indexOf(e.key) >= 0) {
            // equals
            doMath("=");
        } else if (e.key === 'c') {
            // clear
            doMath("c");
        } else if (['<','Backspace'].indexOf(e.key) >= 0) {
            // clear
            doMath("<");
        }
    }
}

// TODOs
/*
FEATURE REQUESTS
-needs a decimal button for numbers 0<i<1

BUGLIST
-after pressing equals to get a sum, pressing number buttons just adds numbers
to the end of the sum. instead, it should overwrite the first number.
*/

buttons.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        doMath(e.target.id);
    }
})

display.textContent = "00.00";