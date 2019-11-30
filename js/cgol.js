const gameWidth = 25;
const gameHeight = 25;
const gameboard = document.getElementById('gameboard');
const clear = document.getElementById('clear');
const step = document.getElementById('step');
const play = document.getElementById('play');
const stop = document.getElementById('stop');

const demo1 = document.getElementById('demo1');

let cont = false;

stop.style.display = 'none';

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function getIdName(x, y) {
	return (idName = 'x' + x.toString() + 'y' + y.toString());
}
function getXYFromId(id) {
	let array = id.toString().match(/^\d+|\d+\b|\d+(?=\w)/g);
	let x = array[0];
	let y = array[1];
	return [ x, y ];
}

function getCellById(id) {
	return document.querySelector('[' + id + ']');
}

function toggleCell(x, y) {
	let selected = document.querySelector('[id=' + getIdName(x, y) + ']');
	if (selected.className == 'dead') {
		selected.className = 'alive';
	} else {
		selected.className = 'dead';
	}
}

function toggleCellById(id) {
	let selected = document.querySelector('[id=' + id + ']');
	if (selected.className == 'dead') {
		selected.className = 'alive';
	} else {
		selected.className = 'dead';
	}
}

function buildGameBoard() {
	// build game board
	for (let i = 0; i < gameHeight; i = i + 1) {
		let gdiv = document.createElement('div');
		for (let j = 0; j < gameWidth; j = j + 1) {
			let newButton = document.createElement('button');
			let idName = getIdName(j, i);
			newButton.id = idName;
			newButton.className = 'dead';
			gdiv.appendChild(newButton);
		}
		gameboard.appendChild(gdiv);
	}
}

function buildArray() {
	let gameArray = [];
	for (let i = 0; i < gameHeight; i += 1) {
		let newArray = [];
		for (let j = 0; j < gameWidth; j += 1) {
			if (document.getElementById('x' + j + 'y' + i).className === 'alive') {
				newArray.push(1);
			} else {
				newArray.push(0);
			}
		}
		gameArray.push(newArray);
	}
	return gameArray;
}

function numberOfLiveNeighbors(id, gameArray) {
	let [ strX, strY ] = getXYFromId(id);
	let varX = parseInt(strX);
	let varY = parseInt(strY);
	let livingNeighbors = 0;
	for (let y = varY - 1; y <= varY + 1; y += 1) {
		for (let x = varX - 1; x <= varX + 1; x += 1) {
			if (y >= 0) {
				if (y < gameHeight) {
					if (x >= 0) {
						if (x < gameWidth) {
							if (gameArray[y][x] > 0) {
								if (varX != x || varY != y) {
									livingNeighbors += 1;
								}
							}
						} else {
							if (gameArray[y][0] > 0) {
								if (varX != x || varY != y) {
									livingNeighbors += 1;
								}
							}
						}
					} else {
						if (gameArray[y][gameWidth - 1] > 0) {
							if (varX != x || varY != y) {
								livingNeighbors += 1;
							}
						}
					}
				} else {
					if (gameArray[0][x] > 0) {
						if (varX != x || varY != y) {
							livingNeighbors += 1;
						}
					}
				}
			} else {
				if (gameArray[gameWidth - 1][x] > 0) {
					if (varX != x || varY != y) {
						livingNeighbors += 1;
					}
				}
			}
		}
	}
	if (livingNeighbors) {
		console.log(id + ' has ' + livingNeighbors + ' living neighbors');
	}
	return livingNeighbors;
}
function conwayGameOfLife() {
	let gameArray = buildArray();
	// plays one step in COL.

	// for each cell
	for (let y = 0; y < gameHeight; y += 1) {
		for (let x = 0; x < gameWidth; x += 1) {
			let id = 'x' + x + 'y' + y;
			let livingNeighbors = numberOfLiveNeighbors(id, gameArray);
			let button = document.getElementById(id);
			if (livingNeighbors === 3) {
				if (button.className === 'dead') {
					console.log('cell id ' + id + ' is born');
					button.className = 'living';
				} else {
					console.log('cell id ' + id + ' is still alive');
					button.className = 'living';
				}
			} else if (livingNeighbors === 2) {
				if (button.className === 'alive') {
					console.log('cell id ' + id + ' is still surviving');
					button.className = 'living';
				}
			} else if (livingNeighbors < 2) {
				if (button.className === 'alive') {
					console.log('cell id ' + id + ' is dying, underpopulated');
					button.className = 'dying';
				}
			} else if (livingNeighbors > 3) {
				if (button.className === 'alive') {
					console.log('cell id ' + id + ' is dying, overpopulated');
					button.className = 'dying';
				}
			}
		}
	}
	let living = document.querySelectorAll('[class=living]');
	for (let i = 0; i < living.length; i += 1) {
		living[i].className = 'alive';
	}
	let dying = document.querySelectorAll('[class=dying]');
	for (let i = 0; i < dying.length; i += 1) {
		dying[i].className = 'dead';
	}
}

async function startGame() {
	let speed = 2000 - document.getElementById('speed').value;
	play.style.display = 'none';
	stop.style.display = '';
	cont = true;
	while (cont === true) {
		conwayGameOfLife();
		speed = 2000 - document.getElementById('speed').value;
		await sleep(speed);
	}
}

function stopGame() {
	cont = false;
	play.style.display = '';
	stop.style.display = 'none';
}

function resetBoard() {
	stopGame();
	gameboard.innerHTML = '';
	buildGameBoard();
}

buildGameBoard();
gameboard.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		console.log(e.target.id);
		toggleCellById(e.target.id);
	}
});

clear.addEventListener('click', () => {
	resetBoard();
});
step.addEventListener('click', () => {
	cont = false;
	conwayGameOfLife();
});
play.addEventListener('click', (e) => {
	startGame();
});
stop.addEventListener('click', (e) => {
	stopGame();
});
/*
demo1.addEventListener("click", ()=>{
	resetBoard();
});
*/
