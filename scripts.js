const gameBoard = (() => {
  let board = document.getElementById("gameBoard");
  const squares = 9;

  for (let i = 0; i < squares; i++) {
    let gameSquare = document.createElement("div");
    gameSquare.className = "gameSquare";
    gameSquare.id = `${"square" + [i + 1]}`;
    board.appendChild(gameSquare);
  }
})();
