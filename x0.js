let activePlayer = "X";
let nextPlayer = "0";
let msgBottomString = "The player " + activePlayer + " start the game";
let winner = "";
let isBlanc = 0 ;
let scoreX = 0, score0 = 0;
let countGame=0;

////////////////////////////////////////////////////////////
/////////////// Basic game functionality
////////////////////////////////////////////////////

//startup event
function onLoadPage() {	
	disableCells(false); 
	displayBottomMessage("The player " + activePlayer +" start the game")  
}

//Reset game and initialize matrix and messages
function btnReset() {
	initCellsContent();
	disableCells(false);
	firstPlayer();
	displayBottomMessage("The player " + activePlayer + " start the game")  	
}

function firstPlayer() {
	countGame ++;
	if (countGame % 2 == 0)
		activePlayer = "X";
	else 
		activePlayer = "0";
}


// Push cell event
function onCellPressed(cellNumber) {
	setCellContent(cellNumber);
	analyzeMatrix();
	checkNullGameOver();
	toggleActivePlayer();
	if (winner == "")
		displayBottomMessage("It's turn to " + activePlayer + " to move")
}

//Set the letter X or 0 and toggle
function setCellContent(cellNumber) {
	cellId = cellNumber; //Get id cell
	document.getElementById(cellId).value = activePlayer;
	document.getElementById(cellId).disabled = true;
}

function toggleActivePlayer() {
	if (activePlayer == "X") {
		activePlayer = "0";	
	} else 
		activePlayer = "X";
}

function getCell(i,j) {
	cell= document.getElementById( i * 10 + j).value;
	if (cell == "")
		isBlanc=1;
	return cell;
}

function setCell(i,j,value) {
	 document.getElementById( i * 10 + j).value = value;	
}
//Look for XXX or 000 sequences in all direction : horizontal,vertical,diagonal
function analyzeMatrix() {
	 winner = "";
	 isBlanc = 0 ;
	//Check all horizontal lines
	for (let i = 1; i <= 3; i ++) 
		checkWinner(getCell(i, 1) ,getCell(i, 2) ,getCell(i, 3))
	//Check all vertical columns	 
	for (let j = 1; j <= 3; j ++) 	
		checkWinner(getCell(1, j) ,getCell(2, j) ,getCell(3, j));

  //Check main diagonal
  	checkWinner(getCell(1, 1) ,getCell(2, 2) ,getCell(3, 3));

	//Check auxiliary diagonal
	checkWinner(getCell(1, 3) ,getCell(2, 2) ,getCell(3, 1));
}

function checkWinner(element1, element2, element3) {
	if (element1 == element2 && element1 == element3 && element2 == element3  && element1 != "") {
		winner = element1;
		disableCells(true);
		displayBottomMessage("Game over ! Player " + winner + " win ! ");
		score();	 	
	}
}

function checkNullGameOver() {
	//check game over full
	if (isBlanc == 0 && winner == "" ) {  //Game over
		disableCells(true);
		displayBottomMessage("Game NULL over ! ");
		winner = "=";
	}	
}

function displayBottomMessage( stringToPrint ) {
	msgBottomString=stringToPrint;
	document.getElementById("msgBottom").innerHTML=msgBottomString;
}

function disableCells(action) {
//Disable all cells at game over
for (let i = 1; i <= 3; i ++)
	for (let j = 1; j <= 3; j ++) {
		nn= i * 10 + j
	//document.getElementById ("b" + nn).disabled = action; 
		document.getElementById ( i * 10 + j).disabled = action; 
	}
}

function initCellsContent() {
	for (let i = 1; i <= 3; i ++)
		for (let j = 1; j <= 3; j ++) 
			setCell(i, j ,"");
}

function score() {
	if (winner == "X")
		scoreX ++;
	if (winner == "0")
		score0 ++;
	document.getElementById("scoreX").innerHTML = scoreX;	
	document.getElementById("score0").innerHTML = score0;	
}
