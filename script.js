

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartButton = document.querySelector("#restart");

// Scoreboard elements
const scoreXText = document.querySelector("#scoreX");
const scoreOText = document.querySelector("#scoreO");
const scoreDrawText = document.querySelector("#scoreDraw");

let currentPlayer = "X";
let gameActive = true;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

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
    const clickedCell = event.currentTarget;

    if (clickedCell.textContent !== "" || !gameActive) {
        return;
    }

    clickedCell.textContent = currentPlayer;

    if (checkWinner()) {
        gameActive = false;

        if (currentPlayer === "X") {
            scoreX++;
            scoreXText.textContent = scoreX;
        } else {
            scoreO++;
            scoreOText.textContent = scoreO;
        }

        statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
        return;
    }

    // Check for a draw
    if ([...cells].every(cell => cell.textContent !== "")) {
        gameActive = false;
        scoreDraw++;
        scoreDrawText.textContent = scoreDraw;
        statusText.textContent = "🤝 It's a draw!";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            cells[a].textContent !== "" &&
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent
        ) {
            // Highlight and animate the winning cells
            combination.forEach(index => {
                cells[index].classList.add("winner");
            });

            return true;
        }
    }

    return false;
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner");
    });

    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);
