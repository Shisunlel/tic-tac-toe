const resetButton = document.querySelector("#reset");
const result = document.querySelector('.result')
const resultText = document.querySelector('.result-text')

const playerFactory = (name, sign) => {
  return { name, sign };
};

const eventOnItem = function (index) {
  //update board
  gameBoard.board[index] = game.currentPlayer.sign;
  this.style.pointerEvents = "none";
  this.innerText = game.currentPlayer.sign;

  game.spot -= 1;

  game.checkWinner();

  if (!game.gameEnd) {
    if (game.spot > 0) {
      game.nextPlayer();
    }
    if (game.spot === 0) {
      game.tie();
    }
  }
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

  const squareChild = Array.from(squares.children);

  //add event to each item
  squareChild.forEach((item, index) => {
    item.addEventListener("click", eventOnItem.bind(item, index));
  });

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
    squareChild.forEach((item) => {
      item.innerText = "";
      item.style.pointerEvents = "visible";
    });
  };

  return { board, reset };
})();

const game = (() => {
  const player1 = playerFactory("player1", "X");
  const player2 = playerFactory("player2", "O");

  let currentPlayer = player1;
  let spot = 9;
  let gameEnd = false;

  //winning pattern
  const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = function () {
    winPattern.forEach((item) => {
      if (
        gameBoard.board[item[0]] === this.currentPlayer.sign &&
        gameBoard.board[item[1]] === this.currentPlayer.sign &&
        gameBoard.board[item[2]] === this.currentPlayer.sign
      ) {
        resetButton.style.display = "inherit";
        result.style.display = 'inherit';
        resultText.innerText = `${this.currentPlayer.name} WINS`;
        this.gameEnd = true;
      }
    });
  };

  const nextPlayer = function () {
    this.currentPlayer == player1
      ? (this.currentPlayer = player2)
      : (this.currentPlayer = player1);
  };

  const tie = function () {
    resultText.innerText = 'Game is tied'
    resetButton.style.display = "inherit";
    result.style.display = 'inherit'
  };

  const reset = function () {
    resetButton.style.display = "none";
    result.style.display = 'none'
    this.spot = 9;
    this.gameEnd = false;
  };

  return { currentPlayer, nextPlayer, checkWinner, spot, gameEnd, tie, reset };
})();

resetButton.addEventListener("click", () => {
  game.reset();
  gameBoard.reset();
});
