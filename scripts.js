const gameBoard = (() => {
  let allMarkers = Array.from(document.getElementsByClassName("marker"));

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

  let playSelection = (e) => {
    if (e.target.innerHTML === "X") {
      removeClass(e.target.parentElement);
      drawMarker(e.target.parentElement, e.target.innerHTML);
      checkBoard();
    } else if (e.target.innerHTML === "O") {
      removeClass(e.target.parentElement);
      drawMarker(e.target.parentElement, e.target.innerHTML);
      checkBoard();
    }
  };

  let removeClass = (e) => {
    e.classList.remove("inactive");
    e.classList.add("active");
  };

  let drawMarker = (e, value) => {
    e.innerHTML = value;
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

  allMarkers.forEach((element) =>
    element.addEventListener("click", playSelection)
  );
})();

const Player = (name, marker, score) => {
  this.name = name;
  this.marker = marker;
  this.score = score;
};

const Controller = (() => {
  let gameBtn = document.getElementById("gameBtn");
  let allMarkers = Array.from(document.getElementsByClassName("marker"));
  let startGame = () => {
    allMarkers.forEach((element) => {
      element.classList.remove("hidden");
    });
    gameBtn.innerHTML = "Reset";
  };
  gameBtn.addEventListener("click", startGame);
})();
