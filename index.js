const battleship = () => {
  var player1 = {
    name: "",
    remainingBoats: 0,
    gameBoard: [
      [0, 0, 0, 0], 
      [0, 0, 0, 0], 
      [0, 0, 0, 0], 
      [0, 0, 0, 0]
  ]
  };
  let player2 = {
    name: "",
    remainingBoats: 0,
    gameBoard: [
      [0, 0, 0, 0], 
      [0, 0, 0, 0], 
      [0, 0, 0, 0], 
      [0, 0, 0, 0]
  ]
  };
  let player;
  let currentPlayer = player1;
  let livesPlayer1;
  let livesPlayer2;

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
  playerNames(); //call the function

  // create a function that generates random numbers
  const getRandomInt = () => {
    let minInt = 0;
    let maxInt = 4;
    let randNum = Math.floor(Math.random() * (+maxInt - +minInt)) + +minInt;
    return randNum;
  }
  
  // function that randomly add ships to each board
  const shipPlace = (player) => {
    let x = getRandomInt();
    let y = getRandomInt();
    let i = 0;
    if (player.gameBoard[x][y] === 1) {
      return
    } else {
      player.gameBoard[x][y]= 1;
      player.remainingBoats++;  
    } 
  }

  while(player1.remainingBoats < 4) { // fill out the board game while the amount of ships equals 4
    shipPlace(player1);
  }
  console.log("Player 1 " + JSON.stringify(player1.gameBoard));

  while(player2.remainingBoats < 4) {
    shipPlace(player2);
  }
  console.log("Player 2 " + JSON.stringify(player2.gameBoard));

  const turnPlayers = () => {
    player = currentPlayer.name;
    lives = currentPlayer.remainingBoats;
    livesPlayer1 = player1.remainingBoats;
    livesPlayer2 = player2.remainingBoats;
    document.getElementById('turn_player').textContent = player;
    document.getElementById('ships_player1').textContent = livesPlayer1;
    document.getElementById('ships_player2').textContent = livesPlayer2;
  }

  // creating the board for player 1
  const board_Player1 = document.getElementById('board_player1');
  for (var x = 0; x < 4; x++) {
    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board
    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      cell.value = 0;//state of the cell
      cell.addEventListener( 'click', (e) => {
      let cell = e.target; // get the element clicked
      
      if (document.getElementById("board_player2").disabled === true) {
        return false;
      }
      document.getElementById('board_player1').disabled = false;
      document.getElementById('board_player2').disabled = true;
      
      let coordinates = cell.textContent.split(',');
      let xChoice = parseInt(coordinates[0]); // extract x as first position
      let yChoice = parseInt(coordinates[1]); // extract y as a second position
      if (player1.gameBoard[xChoice][yChoice] === 1 || player2.gameBoard[xChoice][yChoice] === 1) {
        player1.gameBoard[xChoice][yChoice] = 0
        player1.remainingBoats--;
        alert("You hit the opponent's ship!");
        cell.style.background = 'red';
      } else {
        alert("You miss the opponent's ship!");
        cell.style.background = 'lightyellow';
      }
      currentPlayer = player1;
      opponentPlayer = player2;
      turnPlayers();
      if(player1.remainingBoats === 0){
        alert(`Congratulations ${player2.name} you win!!!`)
      }
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
      cell.addEventListener( 'click', (e) => {
      let cell = e.target;
      if (document.getElementById("board_player1").disabled === true) {
        return false;
      }
      document.getElementById('board_player1').disabled = true;
      document.getElementById('board_player2').disabled = false;
      let coordinates = cell.textContent.split(',');
      let xChoice = parseInt(coordinates[0]); // extract x as first position
      let yChoice = parseInt(coordinates[1]); // extract y as a second position
      if (player1.gameBoard[xChoice][yChoice] === 1 || player2.gameBoard[xChoice][yChoice] === 1) {
        player2.gameBoard[xChoice][yChoice] = 0
        player2.remainingBoats--;
        alert("You hit the opponent's ship!");
        cell.style.background = 'red';
      } else {
        alert("You miss the opponent's ship!");
        cell.style.background = 'lightyellow';
      }
      currentPlayer = player2;
      opponentPlayer = player1;
      turnPlayers();
      if(player2.remainingBoats === 0){
        alert(`Congratulations ${player1.name} you win!!!`)
        }
      });
      li.appendChild(cell);
    };
    board_Player2.appendChild(li);
  }
  return `The winner is ${currentPlayer.name}`;
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
battleship();