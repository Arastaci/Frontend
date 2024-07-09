const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 6, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      gameOver = true;
      message.textContent = `${currentPlayer} KAZANDI!`;
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      return;
    }
  }
  if (!gameBoard.includes("")) {
    gameOver = true;
    message.textContent = "BERABERE!";
  }
}

function move(cellIndex) {
  if (!gameBoard[cellIndex] && !gameOver) {
    gameBoard[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;
    cells[cellIndex].classList.add(currentPlayer);
    checkWin();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function restartGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  message.textContent = "";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("win", "X", "O");
  });
}
