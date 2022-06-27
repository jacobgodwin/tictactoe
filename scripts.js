const gameBoard = (() => {
  let board = document.getElementById("gameBoard");
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

  allMarkers.forEach((element) =>
    element.addEventListener("click", playSelection)
  );

  let removeClass = (e) => {
    e.classList.remove("inactive");
    e.classList.add("active");
  };

  let drawMarker = (e, value) => {
    e.innerHTML = value;
  };

  let checkBoard = () => {
    let activeSquares = Array.from(document.getElementsByClassName("active"));
    console.log(activeSquares);
  };

  return winConditions;
})();

const Player = (name, marker, score) => {
  this.name = name;
  this.marker = marker;
  this.score = score;
};
