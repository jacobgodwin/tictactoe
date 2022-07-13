const gameBoard = (() => {
  const winConditions = [
    ["square1", "square2", "square3"],
    ["square4", "square5", "square6"],
    ["square7", "square8", "square9"],
    ["square1", "square4", "square7"],
    ["square2", "square5", "square8"],
    ["square3", "square6", "square9"],
    ["square1", "square5", "square9"],
    ["square3", "square5", "square7"],
  ];
  let xArray = [];
  let oArray = [];
  let gameSquares = Array.from(document.getElementsByClassName("gameSquare"));
  let gameCounter = 0;

  const playSelection = (e) => {
    console.log(gameCounter);
    if (gameCounter % 2 === 0) {
      gameCounter += 1;
      console.log(gameCounter);
      e.target.removeEventListener("click", playSelection);
      modifyClass(e.target, "inactive", "active");
      drawMarker(e.target, "X");
      checkBoard();
    } else {
      gameCounter += 1;
      console.log(gameCounter);
      e.target.removeEventListener("click", playSelection);
      modifyClass(e.target, "inactive", "active");
      drawMarker(e.target, "O");
      checkBoard();
    }
  };

  const modifyClass = (item, remove, add) => {
    item.classList.remove(remove);
    item.classList.add(add);
  };

  const drawMarker = (e, value) => {
    let div = document.createElement("div");
    div.innerHTML = value;
    e.appendChild(div);
    if (value === "X") {
      xArray.push(e.id);
    } else if (value === "O") {
      oArray.push(e.id);
    } else {
      console.log("Error assigning square marker!");
    }
  };

  const checkBoard = () => {
    let activeSquares = Array.from(document.getElementsByClassName("active"));
    if (activeSquares.length < 9) {
      winConditions.forEach((item) => {
        if (item.every((element) => xArray.includes(element))) {
          alert(displayController.players[0].name + " Wins!");
          gameSquares.forEach((element) =>
            element.removeEventListener("click", playSelection)
          );
        } else if (item.every((element) => oArray.includes(element))) {
          alert(displayController.players[1].name + " Wins!");
          gameSquares.forEach((element) =>
            element.removeEventListener("click", playSelection)
          );
        }
      });
    } else if (activeSquares.length === 9) {
      alert("Tie!");
    }
  };

  const clearScoreArray = () => {
    while (xArray.length > 0) {
      xArray.pop();
    }
    while (oArray.length > 0) {
      oArray.pop();
    }
  };

  const resetCounter = () => {
    gameCounter = 0;
  };

  return {
    gameSquares: gameSquares,
    gameCounter: gameCounter,
    winConditions: winConditions,
    xArray: xArray,
    oArray: oArray,
    modifyClass: modifyClass,
    clearScoreArray: clearScoreArray,
    playSelection: playSelection,
    resetCounter: resetCounter,
  };
})();

const displayController = (() => {
  let gameBtn = document.getElementById("gameBtn");
  let players = [];

  function Player(name, score, player) {
    this.name = name;
    this.score = score;
    this.player = player;
    players.push(this);
  }

  const startGame = () => {
    gameBtn.innerHTML = "Reset";
    gameBoard.gameSquares.forEach((element) =>
      element.addEventListener("click", gameBoard.playSelection)
    );
    gameBtn.addEventListener("click", resetGame);
  };

  const resetGame = () => {
    gameBoard.gameSquares.forEach((element) => {
      element.addEventListener("click", gameBoard.playSelection);
      if (Array.from(element.classList).includes("active")) {
        element.lastChild.remove();
        gameBoard.modifyClass(element, "active", "inactive");
      }
    });
    gameBoard.clearScoreArray();
    gameBoard.resetCounter();
  };

  const addPlayer = () => {
    let playerForms = Array.from(document.getElementsByTagName("form"));
    let playerDisplay = document.getElementById("playerNames");
    playerForms.forEach((element) => {
      if (element.elements[0].value) {
        if (element.id === "player1") {
          playerDisplay.innerHTML = element.elements[0].value;
          new Player(element.elements[0].value, 0, "Player 1");
          console.log(players[0].name);
          element.classList.add("hidden");
        } else {
          playerDisplay.innerHTML += " vs " + element.elements[0].value;
          new Player(element.elements[0].value, 0, "Player 2");
          element.classList.add("hidden");
        }
      } else {
        if (element.id === "player1") {
          playerDisplay.innerHTML = "Player 1";
          new Player("Player 1", 0, "Player 1");
          console.log(players[0].name);
          element.classList.add("hidden");
        } else {
          playerDisplay.innerHTML += " vs " + "Player 2";
          new Player("Player 2", 0, "Player 2");
          element.classList.add("hidden");
        }
      }
    });
  };

  gameBtn.addEventListener("click", startGame);
  gameBtn.addEventListener("click", addPlayer);

  return {
    players: players,
  };
})();
