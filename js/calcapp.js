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

const buttonTimes = document.getElementById("*");
const buttonDivide = document.getElementById("/");
const buttonPlus = document.getElementById("+");
const buttonMinus = document.getElementById("-");

const buttonEquals = document.getElementById("=");

let firstNumber = null;
let secondNumber = null;
let sum = 0.0;
let action = "";

// formats numbers to have commas on the digits, but not the decimals
const numberWithCommas = (x) => { // takes a int or string
    // split input at the decimal
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

// main math function that performs the calculator function
function doMath(buttonid) {
    // if button is not a number
    if (isNaN(buttonid)) {
        console.log("not a number")
        if (buttonid === "c") {
            firstNumber = null;
            secondNumber = null;
            action = "";
            display.textContent = "00.0";
        } else if (buttonid == "=" && secondNumber === null) {
            // do nothing
        } else if (firstNumber === null) {
            // if a number hasn't been entered yet, do nothing
        } else if (action === null) {
            // if a number has been entered, save the math sign
            action = buttonid;
            display.textContent = numberWithCommas(firstNumber) + " " + action;
        } else if (secondNumber === null) {
            action = buttonid;
            display.textContent = numberWithCommas(firstNumber) + " " + action

// TODO: UX plan.
/* as soon as we have a secondNumber and a math operator, we should show the 
sum. The equals button will then move the sum to be the new first number, and
start a new operation.
*/


// TODO: BUG - 
// 0.05194805194805195 + 2,000 = 0.051948051948051952000 (RESULT)
// 0.05194805194805195 + 2,000 = 2,000.05194805194805195 (EXPECTED)
/* shouldn't be concatenating strings, should be adding numbers. */


        } else {
            if (buttonid === "=") {
                console.log("button is =")
                if (secondNumber == null) {

                } else {
                    if (action === "+") {
                        sum = firstNumber + secondNumber;
                        display.textContent = numberWithCommas(firstNumber) + " " + action + " " + numberWithCommas(secondNumber) + " " + "= " + numberWithCommas(sum);
                    } else if (action === "-") {
                        sum = firstNumber - secondNumber;
                        display.textContent = numberWithCommas(firstNumber) + " " + action + " " + numberWithCommas(secondNumber) + " " + "= " + numberWithCommas(sum);
                    } else if (action === "*") {
                        sum = firstNumber * secondNumber;
                        display.textContent = numberWithCommas(firstNumber) + " " + action + " " + numberWithCommas(secondNumber) + " " + "= " + numberWithCommas(sum);
                    } else if (action === "/") {
                        sum = parseFloat(firstNumber) / parseFloat(secondNumber);
                        if (parseFloat(sum) == parseInt(sum)) {
                            display.textContent = numberWithCommas(firstNumber) + " " + action + " " + numberWithCommas(secondNumber) + " " + "= " + numberWithCommas(sum);
                        } else {
                            display.textContent = numberWithCommas(firstNumber) + " " + action + " " + numberWithCommas(secondNumber) + " " + "= " + numberWithCommas(sum);

                        }
                    }
                    firstNumber = sum;
                    secondNumber = null;
                    sum = 0.0
                    action = "";
                }

            }
        }
        // if button is a number
    } else {
        console.log("is a number")
        if (sum === 0) {
            if (firstNumber === null) {
                firstNumber = parseInt(buttonid);
                display.textContent = numberWithCommas(firstNumber);
            } else if (action === "") {
                newNumber = (firstNumber.toString() + buttonid.toString());
                firstNumber = newNumber;
                display.textContent = numberWithCommas(firstNumber);
            } else {
                if (secondNumber === null) {

                    secondNumber = parseInt(buttonid);
                    display.textContent = numberWithCommas(firstNumber) + " " + action + " " + numberWithCommas(secondNumber);
                } else {
                    newNumber = (secondNumber.toString() + buttonid.toString());
                    secondNumber = newNumber;
                    display.textContent = numberWithCommas(firstNumber) + " " + action + " " + numberWithCommas(secondNumber);
                }
            }
        } else {
            firstNumber = parseInt(buttonid);
            sum = 0;
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

display.textContent = "00.0";