
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");

let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



function handleCellClick(event) {
    const clickedCell = event.target;

    if (clickedCell.textContent !== "" || !gameActive) {
        return;
    }

    clickedCell.textContent = currentPlayer;

    checkWinner();

    if (!gameActive) {
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";



if ([...cells].every(cell => cell.textContent !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
}

statusText.textContent = `Player ${currentPlayer}'s turn`;


    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});


function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            cells[a].textContent !== "" &&
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent
        ) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
    }
}

const restartButton = document.querySelector("#restart");

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = "";
    });

    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";
}

restartButton.addEventListener("click", restartGame);

