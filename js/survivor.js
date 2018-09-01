/* DevNotes for Survivor */
/* Survivor is a survival strategy game. The view is top-down 2D, in the 
spirit of Pac-Man. */

/* CONTROLLERS */
// speedSlider controls how fast the simulation cycles through steps
const speedSlider = document.createElement('input')
// hunterSlider controls the hunger/hp threshold where the motivation 
// switches from hunting to foraging
const hunterSlider = document.createElement('input')

// detect small windows, and adjust accordingly
/*
if(window.innerWidth <= 800 || window.innerHeight <= 600) {
		viewWidth = 13;
		viewHeight = 13;
   }
*/

/* RARITY VARIABLES */
var foodRarity = 500;
var monsterRarity = 500;
var rockRarity = 25;


/* Tracked attributes */
/* Level - right now, this is set by the length of the number string- the 
number of digits in the number. ex: 10xp is 2, 10000xp is 5
XP - classic experience points
HP - Out of 100 
	health is lost when fighting a monster, or when hunger is less than 0
	health is restored when eating food
Hunger - out of 100
	hunger is lost for each step
	hunger is restored when eating food
Kills - number of monsters killed
steps - the number of steps you've been alive. */

var lvl = 1;
var hp = 100;
var xp = 0;
var hunger = 100;
var steps = 0;
var kills = 0;
var trailReset=0;



/* GAMEBOARD SETUP */
// gameboard is a 27 unit square
var viewWidth = 27;
var viewHeight = 27;
const gameBoard = document.createElement('div');
gameBoard.style.display='inline-block'
gameBoard.id="gameboard";
var boardArray = [];

/* MENU/CONTROLLER SETUP*/
const body = document.querySelector('body');
const container = document.createElement('div');
const p = document.createElement('p');
p.id = 'menu';
const startButton = document.createElement('button');
startButton.textContent = 'START';
startButton.style.backgroundColor = 'lightgreen';
container.className = "container";
p.textContent = "| SURVIVOR | ";
p.style.display='inline-block';
p.style.padding='2em';
p.style.borderWidth= '1px';
const lvlText = document.createElement('p');
lvlText.textContent = "Level: "+lvl;
p.appendChild(lvlText);

/* MENU text setup */
const xpText = document.createElement('p');
xpText.textContent = "XP: "+xp;
p.appendChild(xpText);
const hpText = document.createElement('p');
hpText.textContent = "HP: "+hp+"/100";
p.appendChild(hpText);
const hungerText = document.createElement('p');
hungerText.textContent = "hunger: "+hunger+"/100";
p.appendChild(hungerText);
const motivationText = document.createElement('p');
motivationText.textContent = "Motivation: ?";
p.appendChild(motivationText);
const genText = document.createElement('p');
genText.textContent = "You've been alive for "+steps+" steps";
p.appendChild(genText);
const killText = document.createElement('p');
killText.textContent = "killed "+kills+" monsters";
p.appendChild(killText);

/* CONTROLLER sliders */
const hunterLabel = document.createElement('p');
hunterLabel.textContent = "<< Hunt << | >> Forage >>";
p.appendChild(hunterLabel);
hunterSlider.type='range';
hunterSlider.defaultValue=70;
hunterSlider.max=100;
hunterSlider.min=0;
p.appendChild(hunterSlider);
const rangeLabel = document.createElement('p');
rangeLabel.textContent = "Speed:";
p.appendChild(rangeLabel);
speedSlider.label='speed';
speedSlider.type='range';
speedSlider.max=2000;
speedSlider.min=0;
speedSlider.defaultValue=1850;
p.appendChild(speedSlider);

const buttonDiv = document.createElement('div');
buttonDiv.appendChild(startButton);
p.appendChild(buttonDiv);

container.appendChild(p);
container.appendChild(gameBoard);
body.appendChild(container);
buildNewGameBoard();
const yourLocation = [Math.floor(viewWidth/2), Math.floor(viewHeight/2)];

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getXYFromId(id) {
	let array = id.toString().match(/^\d+|\d+\b|\d+(?=\w)/g);
	let x = array[0];
	let y = array[1];
	return [x,y];
}

function getIdName(x,y) {
	return idName="x"+x.toString()+"y"+y.toString();
}

function setTileContent(id) {
	const tile = document.querySelector("[id="+id+"]");
	if (parseInt(Math.random()*foodRarity)===0) {
		return ['FOOD',2];
	} else if (parseInt(Math.random()*monsterRarity)===0) {
		return ['MONSTER',3];
	} else if (parseInt(Math.random()*rockRarity)===0) {
		return ['Trail',4];
	} else {
		return ['',0];
	}
}

function deincrementHunger() {
	hunger-=1;
	if (hunger<=0) {
		hp-=1;
	}
	if (hp<=0) {
		cont=false;
		boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)] = 0;
		p.textContent = "You've were alive for "+steps+" steps, and killed "+kills+" monsters, but then you were killed by a monster."
	}
	buildGameBoardFromArray();
	updateText();
}

function updateText() {
	lvlText.textContent = "Level: "+xp.toString().length;
	xpText.textContent = "XP: "+numberWithCommas(xp);
	hungerText.textContent = "hunger: "+hunger+"/100";
	hpText.textContent = "HP: "+hp+"/100";
	genText.textContent = "You've been alive for "+steps+" steps";
	killText.textContent = "killed "+kills+" monsters";
}

function buildNewGameBoard() {
	// build game board
	for (let i=0; i<viewHeight; i=i+1) {
		let rowArray = [];

		for (let j=0; j<viewWidth; j=j+1) {
			if (j===Math.floor(viewWidth/2) &&
				i===Math.floor(viewHeight/2)) {
				rowArray.push(1);
			} else {
				let content = setTileContent();
				rowArray.push(content[1]);
			}
		}
		boardArray.push(rowArray);
	}
	buildGameBoardFromArray();
}


// TODO: instead of resetting the trail, let's keep a list of the trail and 
// generate the trail when making the gameboard. Then, we can just remove the 
// last item from the list instead of clearing it.
function resetTrail(){
	for (let i=0; i<viewHeight; i=i+1) {
		for (let j=0; j<viewWidth; j=j+1) {
			if (boardArray[j][i] === 5) {
				boardArray[j][i] = 0;
			}
		}
	}
}

function buildGameBoardFromArray() {
	gameBoard.innerHTML='';
	if (hp<0) { 
		gameBoard.parentElement.removeChild(gameBoard);
		return false;
	}
	for (let i=0; i<viewHeight; i=i+1) {
		let gdiv=document.createElement('div');
		for (let j=0; j<viewWidth; j=j+1) {
			let newButton=document.createElement('button');
			let idName = getIdName(j,i);
			newButton.id=idName;
			newButton.style.borderColor="#000";
			newButton.style.backgroundColor="#";
			newButton.style.margin="0";
			if (boardArray[i][j]==0) {
				newButton.className='dead';
			} else if (boardArray[i][j]==1) {
				newButton.className='alive';
			} else if (boardArray[i][j]==2) {
				newButton.className='food';
			} else if (boardArray[i][j]==3) {
				newButton.className='monster';
			} else if (boardArray[i][j]==4) {
				newButton.className='rock';
			} else if (boardArray[i][j]==5) {
				newButton.className='trail';
			}
			gdiv.appendChild(newButton);
		}
	gameBoard.appendChild(gdiv);
	gameBoard.style.display = 'inline-block';

	}
}

function find(query) {
	availableFood = document.querySelectorAll('[class='+query+']');
	let footDistance = [];
	// if there is food, find the closest one
	if (availableFood.length === 0) {
		return null;
	} else {
		for (let i=0; i<availableFood.length; i+=1 ) {
			let locXY = getXYFromId(availableFood[i].id);
			let xDelta = Math.abs(yourLocation[0] - locXY[0]);
			let yDelta = Math.abs(yourLocation[1] - locXY[1]);
			let distance = Math.sqrt(Math.pow(xDelta,2)+Math.pow(yDelta,2));
			footDistance.push([locXY, distance]);
	}
	return footDistance;
	}
}

function findClosest(query) {
	let foundFood = find(query);
	let closestFood = [null,100];
	if (foundFood===null) {
		return null;
	} else {
		for (let i=0; i<foundFood.length; i+=1 ) {
			if (foundFood[i][1] < closestFood[1]) {
				closestFood=foundFood[i];
			}
		}	
	}
	return closestFood;
}

function chase(query) {
	let closestFood = findClosest(query);
	// find which direction to go
	if (closestFood===null) {
		moveEast();
		return null
	}

	let xDistance = Math.abs(yourLocation[0]-parseInt(closestFood[0][0]))
	let yDistance = Math.abs(yourLocation[1]-parseInt(closestFood[0][1]));
	if (xDistance>yDistance) {
		if ((yourLocation[0]===parseInt(closestFood[0]))) {
			// food is north or south
			if (yourLocation[1]<parseInt(closestFood[0][1])) {
				// food is North
				moveSouth();
				} else {
				// food is South
				moveNorth();
			}
		} else if (yourLocation[0]<parseInt(closestFood[0][0])) {
			// food is east
			moveEast();
		} else {
			moveWest();
		}
	} else {
		if ((yourLocation[1]===parseInt(closestFood[0][1]))) {
			// food is east or west
			if (yourLocation[0]<parseInt(closestFood[0][0])) {
				// food is east
				moveEast();
			} else {
				// food is west
				moveWest();
			}
		} else if (yourLocation[1]<parseInt(closestFood[0][1])) {
			// food is South
			moveSouth();
		} else {
			// food is North
			moveNorth();
		}
	}
	// see which would get you closer
}
function checkNewLocation() {
	if (boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)] === 3) {
		let random = parseInt(Math.random()*50); 
		xp += random*random;
		hp -= random;
		kills += 1;
		resetTrail();
		console.log("Monster defeated!");
	} else if (boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)] === 2) {
		xp += 50;
		hp = 100;
		hunger = 100;
		resetTrail();
		console.log("OM NOM NOM");
	}
}

let tries = 0

function moveNorth() {
	if (hp<0) { return false; }
	tries+=1;
	if (tries>8) {
		resetTrail();
	}
	if (boardArray[Math.floor(viewWidth/2)-1][Math.floor(viewHeight/2)] === 4) {
		moveEast();
		return "Moved to avoid rock"
	} else if (boardArray[Math.floor(viewWidth/2)-1][Math.floor(viewHeight/2)] === 5) {
		moveEast();
		return "Moved to avoid the worm";
	}

	let newRow = [];
	boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)] = 0;
	for (let j=0; j<viewWidth; j=j+1) {
		let content = setTileContent('na');
		newRow.push(content[1]);
	}
	boardArray.splice(viewHeight-1,1);
	boardArray.splice(0,0,newRow);
	checkNewLocation();
	boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)] = 1;
	boardArray[Math.floor(viewWidth/2)+1][Math.floor(viewHeight/2)] = 5;
	buildGameBoardFromArray();
	deincrementHunger();
	steps=incrementSteps(steps);
	tries=0;
}


function moveSouth() {
	if (hp<0) { return false; }
	tries+=1;
	if (tries>8) {
		resetTrail();
	}	if (boardArray[Math.floor(viewWidth/2)+1][Math.floor(viewHeight/2)] === 4) {
		moveWest();
		return "Moved to avoid rock"
	} else if (boardArray[Math.floor(viewWidth/2)+1][Math.floor(viewHeight/2)] === 5) {
		moveWest();
		return "Moved to avoid the worm";
	}
	let newRow = [];
	boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)] = 0;
	for (let j=0; j<viewWidth; j=j+1) {
		let content = setTileContent('na');
		newRow.push(content[1]);
	}
	boardArray.splice(0,1);
	boardArray.push(newRow);
	checkNewLocation();
	boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)] = 1;
	boardArray[Math.floor(viewWidth/2)-1][Math.floor(viewHeight/2)] = 5;
	buildGameBoardFromArray();
	deincrementHunger();
	steps=incrementSteps(steps);
	tries=0;
}

function moveWest() {
	if (hp<0) { return false; }
	tries+=1;
	if (tries>8) {
		resetTrail();
	}	if (boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)-1] === 4) {
		moveNorth();
		return "Moved to avoid rock"
	} else if (boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)-1] === 5) {
		moveNorth();
		return "Moved to avoid the worm";
	}
	boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)] = 0;
	for (let i=0; i<viewHeight; i=i+1) {
		let content = setTileContent('na');
		boardArray[i].splice(0,0,content[1]);
		boardArray[i].splice(viewWidth-1,1,0);
	}
	checkNewLocation();
	boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)] = 1;
	boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)+1] = 5;
	buildGameBoardFromArray();
	deincrementHunger();
	steps=incrementSteps(steps);
	tries=0;
}

function moveEast() {
	if (hp<0) { return false; }
	tries+=1;
	if (tries>8) {
		resetTrail();
	}
		if (boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)+1] === 4) {
		moveSouth();
		return "Moved to avoid rock"
	} else if (boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)+1] === 5) {
		moveSouth();
		return "Moved to avoid the worm"
	}
	boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)] = 0;
	for (let i=0; i<viewHeight; i=i+1) {
		let content = setTileContent('na');
		boardArray[i].push(content[1]);
		boardArray[i].splice(0,1);
	}
	checkNewLocation();
	boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)] = 1;
	boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)-1] = 5;
	buildGameBoardFromArray();
	deincrementHunger();
	steps=incrementSteps(steps);
	tries=0;
}

function checkTrailReset(steps) {
	if (steps%4==0) {
		resetTrail();
	}
	return steps;
}

function incrementSteps(steps) {
	steps+=1;
	return checkTrailReset(steps);
}

/* KEYBOARD INPUT for manual control */
//if a key is pressed, run the checkKey function
document.onkeydown = checkKey;
function checkKey(e) {
	//get e as the keydown event
    e = e || window.event;
    //track if we're going to override default actions, default is false
    let disabled = false;
    if (e.keyCode == '38') {
        // up arrow
        moveNorth();
        disabled=true;
    }
    else if (e.keyCode == '40') {
        // down arrow
    	moveSouth();
        disabled=true;
    }
    else if (e.keyCode == '37') {
        // left arrow
    	moveWest();
        disabled=true;
    }
    else if (e.keyCode == '39') {
        // right arrow
    	moveEast();
        disabled=true;
    }
    //if we're going to disabile default actions
    if (disabled===true) {
    	// prevent default event action
        e.preventDefault();
    }
}


// track if automatic play is enabled, default is false
let cont = false;
// add an event listener for the start button
startButton.addEventListener('click', () => {
	//if the start button is clicked
	if (cont===false) {
		// set continue to true to loop gameplay
		cont=true;
		startGame();
		// change the start button into a stop button
		startButton.textContent = 'STOP';
		startButton.style.backgroundColor = 'red';
		startButton.style.color = 'white';
	//if the stop button is clicked
	} else {
		cont=false;
		// change the stop button back into a start button
		startButton.textContent = 'START';
		startButton.style.backgroundColor = 'lightgreen';
		startButton.style.color = 'black';

	}});

// Main automatic gameplay function
async function startGame() {
	while (cont === true) {
		// update label text
		rangeLabel.textContent = "Speed: "+(speedSlider.value/20)+"/100";
		hunterLabel.textContent = "<< Hunt << "+hunterSlider.value+" >> Forage >>";
		if (hunterSlider.value>hunger||hunterSlider.value>hp) {
			chase('food');
			motivationText.textContent="Motivation: Foraging"
		} else { 
			chase('monster');
			motivationText.textContent="Motivation: Hunting"
		}
		// get speed value to set speed
		let speed = 2000-speedSlider.value;
		await sleep(speed);
	}
}
