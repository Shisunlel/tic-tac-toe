const playerFactory = (name, sign) => {
  return { name, sign };
};

const eventOnItem = function () {
  this.style.pointerEvents = "none";
  this.innerText = game.currentPlayer.sign;
  game.nextPlayer();
};

const gameBoard = (() => {
  let board = [];

  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  const squares = document.querySelector(".squares");

  board.forEach((item) => {
    square = document.createElement("div");
    square.innerText = item;
    squares.append(square);
  });

  //add event to each item
  Array.from(squares.children).forEach((item, index) => {
    item.addEventListener("click", eventOnItem);
  });

  return { board };
})();

const game = (() => {
  const player1 = playerFactory("John", "X");
  const player2 = playerFactory("Jojo", "O");

  currentPlayer = player1;

  const nextPlayer = function () {
    this.currentPlayer == player1
      ? (this.currentPlayer = player2)
      : (this.currentPlayer = player1);
  };

  return { currentPlayer, nextPlayer };
})();
