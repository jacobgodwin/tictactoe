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
  let allMarkers = Array.from(document.getElementsByClassName("marker"));
  let gameSquares = Array.from(document.getElementsByClassName("gameSquare"));

  const playSelection = (e) => {
    if (e.target.innerHTML === "X") {
      modifyClass(e.target.parentElement, "inactive", "active");
      drawMarker(e.target.parentElement, e.target.innerHTML);
      checkBoard();
    } else if (e.target.innerHTML === "O") {
      modifyClass(e.target.parentElement, "inactive", "active");
      drawMarker(e.target.parentElement, e.target.innerHTML);
      checkBoard();
    }
  };

  const modifyClass = (item, remove, add) => {
    item.classList.remove(remove);
    item.classList.add(add);
  };

  const drawMarker = (e, value) => {
    let selectionDivs = Array.from(e.children);
    selectionDivs.forEach((element) => element.classList.add("hidden"));
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
        if (
          item.every((element) => xArray.includes(element)) ||
          item.every((element) => oArray.includes(element))
        ) {
          allMarkers.forEach((element) => {
            element.classList.add("hidden");
          });
          alert("You Won!");
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

  allMarkers.forEach((element) =>
    element.addEventListener("click", playSelection)
  );

  return {
    allMarkers: allMarkers,
    gameSquares: gameSquares,
    winConditions: winConditions,
    xArray: xArray,
    oArray: oArray,
    modifyClass: modifyClass,
    clearScoreArray: clearScoreArray,
  };
})();

const displayController = (() => {
  let gameBtn = document.getElementById("gameBtn");
  let player1Btn = document.getElementById("addPlayer1");
  let player2Btn = document.getElementById("addPlayer2");
  let players = [];

  const Player = (name, marker, score) => {
    this.name = name;
    this.marker = marker;
    players.push(this);
  };

  const startGame = () => {
    gameBoard.allMarkers.forEach((element) => {
      element.classList.remove("hidden");
    });
    gameBtn.innerHTML = "Reset";
    gameBtn.addEventListener("click", resetGame);
  };

  const resetGame = () => {
    gameBoard.gameSquares.forEach((element) => {
      if (Array.from(element.classList).includes("active")) {
        element.lastChild.remove();
        gameBoard.modifyClass(element, "active", "inactive");
      }
    });
    gameBoard.clearScoreArray();
  };

  const addPlayer = () => {
    player1Btn.classList.add("hidden");
    player2Btn.classList.add("hidden");
  };

  gameBtn.addEventListener("click", startGame);
})();
