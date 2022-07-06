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

  let playSelection = (e) => {
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

  let modifyClass = (item, remove, add) => {
    item.classList.remove(remove);
    item.classList.add(add);
  };

  let drawMarker = (e, value) => {
    let selectionDivs = Array.from(e.children);
    selectionDivs.forEach((element) => element.classList.add("hidden"));
    e.appendChild(document.createTextNode(value));
    if (value === "X") {
      xArray.push(e.id);
    } else if (value === "O") {
      oArray.push(e.id);
    } else {
      console.log("Error assigning square marker!");
    }
  };

  let checkBoard = () => {
    let activeSquares = Array.from(document.getElementsByClassName("active"));
    if (activeSquares.length < 9) {
      winConditions.forEach((item) => {
        if (
          item.every((element) => xArray.includes(element)) ||
          item.every((element) => oArray.includes(element))
        ) {
          alert("You Won!");
        }
      });
    } else if (activeSquares.length === 9) {
      alert("Tie!");
    }
  };

  let clearScoreArray = () => {
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

  let startGame = () => {
    gameBoard.allMarkers.forEach((element) => {
      element.classList.remove("hidden");
    });
    gameBtn.innerHTML = "Reset";
    gameBtn.addEventListener("click", resetGame);
  };

  let resetGame = () => {
    gameBoard.gameSquares.forEach((element) => {
      if (Array.from(element.classList).includes("active")) {
        element.lastChild.remove();
        gameBoard.modifyClass(element, "active", "inactive");
      }
    });
    gameBoard.clearScoreArray();
  };
  gameBtn.addEventListener("click", startGame);
})();

const Player = (name, marker, score) => {
  this.name = name;
  this.marker = marker;
  this.score = score;
};
