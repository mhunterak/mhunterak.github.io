const speedSlider = document.createElement('input')

const viewWidth = 25;
const viewHeight = 25;

let foodRarity = 500;
let monsterRarity = 500;
let rockRarity = 25;

let lvl = 1;
let hp = 100;
let xp = 0;
let hunger = 100;
let generations = 0;
let kills = 0;

let trailReset=0;




const gameBoard = document.createElement('div');
gameBoard.style.display='inline-block'

gameBoard.id="gameboard";
let boardArray = [];
const body = document.querySelector('body');
const container = document.createElement('div');
const p = document.createElement('p');
p.id = 'menu';
const startButton = document.createElement('button');
startButton.textContent = 'START';
container.className = "container";

p.textContent = "| SURVIVOR | ";
p.style.display='inline-block';
p.style.padding='2em';
p.style.borderWidth= '1px';

const lvlText = document.createElement('p');
lvlText.textContent = "Level: "+lvl;
p.appendChild(lvlText);


const xpText = document.createElement('p');
xpText.textContent = "XP: "+xp;
p.appendChild(xpText);

const hpText = document.createElement('p');
hpText.textContent = "HP: "+hp+"/100";

p.appendChild(hpText);
const hungerText = document.createElement('p');
hungerText.textContent = "hunger: "+hunger+"/100";
p.appendChild(hungerText);

const genText = document.createElement('p');
genText.textContent = "You've been alive for "+generations+" steps";
p.appendChild(genText);

const killText = document.createElement('p');
killText.textContent = "killed "+kills+" monsters";
p.appendChild(killText);

const rangeLabel = document.createElement('p');
rangeLabel.textContent = "Speed:";
p.appendChild(rangeLabel);

speedSlider.label='speed';
speedSlider.type='range';
speedSlider.defaultValue='1500';
speedSlider.max=2000;
speedSlider.min=0;
p.appendChild(speedSlider);
p.appendChild(startButton);
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
		if (hp<=0) {
			cont=false;
			boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)] = 0;
			p.textContent = "You've were alive for "+generations+" steps, and killed "+kills+" monsters, but then you died of starvation.";
			startButton.display='none';
		}
	} else if (hp<=0) {
		cont=false;
		boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)] = 0;
		p.textContent = "You've were alive for "+generations+" steps, and killed "+kills+" monsters, but then you were killed by a monster."
	}
	buildGameBoardFromArray();
	updateText();
}

function updateText() {
	lvlText.textContent = "Level: "+xp.toString().length;
	xpText.textContent = "XP: "+numberWithCommas(xp);
	hungerText.textContent = "hunger: "+hunger+"/100";
	hpText.textContent = "HP: "+hp+"/100";
	genText.textContent = "You've been alive for "+generations+" steps";
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
		console.log("Monster defeated!")
	} else if (boardArray[Math.floor(viewWidth/2)][Math.floor(viewHeight/2)] === 2) {
		hp = 100;
		hunger = 100;
		resetTrail();
		console.log("OM NOM NOM")
	}
}

let tries = 0

function moveNorth() {
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
	tries=0;
}


function moveSouth() {
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
	tries=0;
}

function moveWest() {
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
	tries=0;
}

function moveEast() {
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
	tries=0;
}


document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        moveNorth();
    }
    else if (e.keyCode == '40') {
    	moveSouth();
    }
    else if (e.keyCode == '37') {
    	moveWest();
       // left arrow
    }
    else if (e.keyCode == '39') {
    	moveEast();
       // right arrow
    }

}
let cont = false;

startButton.addEventListener('click', () => {
	if (cont===false) {
		cont=true;
		startGame();
		startButton.textContent = 'STOP';
	} else {
		cont=false;
		startButton.textContent = 'START';
	}});


async function startGame() {
	while (cont === true) {
		if (trailReset>=4) {
			resetTrail();
			trailReset=0;
		} else {
			trailReset+=1;
		}
		let speed = 2000-speedSlider.value;
		if (hp>50 && hunger>50) {
			chase('monster');
		} else {
			chase('food');
		}
		await sleep(speed);
		generations += 1;
	}
}


