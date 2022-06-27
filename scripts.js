const gameBoard = (() => {
  let board = document.getElementById("gameBoard");
  let allMarkers = Array.from(document.getElementsByClassName("marker"));

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
})();

const Player = (name, marker) => {
  this.name = name;
  this.marker = marker;
};
