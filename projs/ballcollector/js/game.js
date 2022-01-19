const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE';
const FREEZE = 'FREEZE';

const GAMER_IMG = '<img src="img/gamer.png">';
const BALL_IMG = '<img src="img/ball.png">';
const GLUE_IMG = '<img src="img/candy.png">'
const FREEZE_IMG = '<img src="img/gamer-purple.png">'
var gGamerPos;
var isFrozen = false;
var countBall;
var gBoard;
var isRestarted = false;

function init() {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	countBall = 0;
	renderBoard(gBoard);
    isRestarted = true
}


function buildBoard() {
	var board = new Array(10)
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(12)
	}

	for (i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var piece = { type: FLOOR, gameElement: '' }
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				piece.type = WALL
			}

			board[i][j] = piece;
		}
	}
	board[0][Math.floor(board[0].length / 2)].type = FLOOR
	board[board.length - 1][Math.floor(board[0].length / 2)].type = FLOOR
	board[Math.floor(board.length / 2)][board[0].length - 1].type = FLOOR
	board[Math.floor(board.length / 2)][0].type = FLOOR

	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER
	var counter = 0
	var ballInterval = setInterval(() => {
		var locationBall = { i: getRandomIntegerD(1, board.length - 2), j: getRandomIntegerD(1, board.length - 2) }
		board[locationBall.i][locationBall.j].gameElement = BALL
		renderCell(locationBall, BALL_IMG)
		if (counter === 10) clearInterval(ballInterval)
		counter++
	}, 1000)
	
	
	var glueInterval = setInterval(() => {
		var locationGlue = { i: getRandomIntegerD(1, board.length - 2), j: getRandomIntegerD(1, board.length - 2) }
		board[locationGlue.i][locationGlue.j].gameElement = GLUE
		renderCell(locationGlue, GLUE_IMG)
		setTimeout(function () {
			if (!isFrozen) {
				board[locationGlue.i][locationGlue.j].gameElement = '';
				renderCell(locationGlue, '');
			}
		}, 3000);
		if (counter === 10) clearInterval(glueInterval)
	}, 5000)

	return board;
}

function renderBoard(board) {

	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	elBoard.innerHTML = strHTML;
}

function moveTo(i, j) {
	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;
    if (isFrozen) return;
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

		if (targetCell.gameElement === BALL) {
			countBall++
			var audio = new Audio('/sound/no-ball.wav');
			audio.play();
			console.log('Collecting!');
			var elCountBall = document.querySelector('.counterBallC')
			elCountBall.innerText = countBall
			if (countBall === 10) {
				if (confirm(' CONGRATS !!You collected all the Balls!! Another Round ?')) init();
			}
		}
        
		
		if (i === 0 && j === Math.floor(gBoard[0].length / 2)) {
			i = gBoard.length - 1
			j = Math.floor(gBoard[0].length / 2)
			console.log('log-test!!!!$$$UPPPP');
		}
		else if (i === gBoard.length - 1 && j === Math.floor(gBoard[0].length / 2)) {
			i = 0
			j = Math.floor(gBoard[0].length / 2)
			console.log('log-test!!!!$$$DOWN');
		}
		else if (i === Math.floor(gBoard.length / 2) && j === gBoard[0].length - 1) {
			i = Math.floor(gBoard.length / 2)
			j = 0
			console.log('log-test!!!!$$$RIGHTTT');
		}
		else if (i === Math.floor(gBoard.length / 2) && j === 0) {
			i = Math.floor(gBoard.length / 2)
			j = gBoard[0].length - 1
			console.log('log-test!!!!$$$RELF');
		}
		// MODEL
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = ''
		// DOM
		renderCell(gGamerPos, '')
		// MODEL
		gGamerPos.i = i
		gGamerPos.j = j

		if (targetCell.gameElement === GLUE) {
			var textFroze= document.querySelector('.text-froze');
			textFroze.style.display = "block";
			console.log('freezeeeeeeeeee');
			isFrozen = true
       
			gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER
			renderCell(gGamerPos, FREEZE_IMG)

			setTimeout(() => {
				renderCell(gGamerPos, GAMER_IMG)
				isFrozen = false
				textFroze.style.display = "none";
			}, 5000);
		 return
		}


		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER
		// DOM
		renderCell(gGamerPos, GAMER_IMG)
		
	} else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
	console.log(location ,value,'loca val');
}

function handleKey(event) {
	console.log(event.key)
	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

