
//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt)
//Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player is clicking the right board) the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship
//We want you to store the data of each player in two Player objects. Each object has to store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. the reset button has to start the game again and the new game create a new game with new players and a new random board.

// creating objects
var player1 = {
  name: "playerOne",
  remainingBoats: 4,
  gameBoard: [
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0]
]
};
let player2 = {
  name: "playerTwo",
  remainingBoats: 4,
  gameBoard: [
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0], 
    [0, 0, 0, 0]
]
};

// creating the board for player 1
const board_Player1 = document.getElementById('board_player1');
for (var x = 0; x < 4; x++) {
  const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board
  for (var y = 0; y < 4; y++) {
    const cell = document.createElement('div');
    cell.className = "square"; // adding css properties to make it looks like a square
    cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
    cell.value = 0;//state of the cell
    //this function adds the click event to each cell
    cell.addEventListener( 'click', (e) => {
        let cell = e.target; // get the element clicked
        console.log( cell.textContent) //display the coordinates in the console
        cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
        // cell.style.background ="purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
    });
    li.appendChild(cell); //adding each cell into the row number x
  }
    board_Player1.appendChild(li); //adding each row into the board
}

// creating the board for player 2
const board_Player2 = document.getElementById('board_player2');
for (var x = 0; x < 4; x++) {
  const li = document.createElement('li');
  for (var y = 0; y < 4; y++) {
    const cell = document.createElement('div');
    cell.className = "square";
    cell.textContent = `${x}, ${y}`;
    cell.value = 0;
    cell.addEventListener('click', (e) => {
      let cell = e.target;
      console.log(cell.textContent);
      cell.style.visibility = 'hidden';
    });
    li.appendChild(cell);
  }
  board_Player2.appendChild(li);
}

// ask the players for their names and put them into respective elements

const playerNames = () => {
  player1.name = prompt("Player 1 what is your name?");
  const name1 = document.getElementById('name_player1');
  const namePlayer1 = document.createElement('div');
  const nameNodePlayer1 = document.createTextNode(player1.name);
  namePlayer1.appendChild(nameNodePlayer1);
  name1.appendChild(nameNodePlayer1);
  
  player2.name = prompt('Player 2 what is your name?');
  const name2 = document.getElementById('name_player2');
  const namePlayer2 = document.createElement('div');
  const nameNodePlayer2 = document.createTextNode(player2.name);
  namePlayer2.appendChild(nameNodePlayer2);
  name2.appendChild(nameNodePlayer2);
};
playerNames(); //call the function playerNames()

// create a function that generates random numbers
const getRandomInt = () => {
  let minInt = 0;
  let maxInt = 4;
  return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}

// randomly add ships to each board
const shipPlace = (player) => {
  let x = getRandomInt();
  let y = getRandomInt();
  if (player.gameBoard[x][y] === 1) {
    return
  } else {
    player.gameBoard[x][y]= 1;
    player.remainingBoats--;
  }
}

  while(player1.remainingBoats > 0) { // fill out the board game while the amount of ships equals 4
    shipPlace(player1);
  }
  console.log(player1.gameBoard); // debugging

  while(player2.remainingBoats > 0) {
    shipPlace(player2);
  }
  console.log(player2.gameBoard); // debugging


let currentPlayer = player1; // create a new variable and assign it to the player1 value
let opponent = player2; // create a new variable and assign it to the player2 value

while(player1.remainingBoats > 0 && player2.remainingBoats > 0) {

//  check the opponent's board to see if the space at those indices is equal to 1
  if (opponent.gameBoard[xChoice][yChoice] === 1) {
    opponent.gameBoard[xChoice][yChoice] = 0;
    opponent.remainingBoats--;
    alert("You hit the opponent's ship!");
  } else {
    alert("You miss the opponent's ship!");
  }
  // change the player's turn
  [currentPlayer, opponent] = [opponent, currentPlayer];
  }


const navigateBtn = () => {
  const navigateBTN = document.getElementById('buttons');
  const resetBtn = document.createElement('button'); //create new element - button
  const newGameBtn = document.createElement('button');
  resetBtn.innerHTML = "Reset Game"; // fill the button with the text
  newGameBtn.innerHTML = "New Game";
  navigateBTN.appendChild(resetBtn);
  navigateBTN.appendChild(newGameBtn);
  resetBtn.addEventListener('click', () => {
    window.location.reload(); // used to reload current document
  })
  newGameBtn.addEventListener('click', () => {
    window.location.reload();
  })
}
navigateBtn();
