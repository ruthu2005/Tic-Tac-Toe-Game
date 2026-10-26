

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartButton = document.querySelector("#restart");

const scoreXText = document.querySelector("#scoreX");
const scoreOText = document.querySelector("#scoreO");
const scoreDrawText = document.querySelector("#scoreDraw");

const gameModeSelect = document.querySelector("#gameMode");

let currentPlayer = "X";
let gameActive = true;
let computerThinking = false;

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

function updateScoreboard() {
    scoreXText.textContent = scoreX;
    scoreOText.textContent = scoreO;
    scoreDrawText.textContent = scoreDraw;
}

function handleCellClick(event) {
    const clickedCell = event.currentTarget;

    if (
        !gameActive ||
        computerThinking ||
        clickedCell.textContent !== ""
    ) {
        return;
    }

    // In computer mode, the human always plays X.
    if (
        gameModeSelect.value === "computer" &&
        currentPlayer !== "X"
    ) {
        return;
    }

    makeMove(clickedCell);

    if (!gameActive) {
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (gameModeSelect.value === "computer") {
        computerThinking = true;
        statusText.textContent = "Computer is thinking...";

        // Short delay so the computer's move feels natural.
        setTimeout(() => {
            if (!gameActive) {
                computerThinking = false;
                return;
            }

            computerMove();

            computerThinking = false;

            if (gameActive) {
                currentPlayer = "X";
                statusText.textContent = "Your turn (Player X)";
            }
        }, 500);
    } else {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function makeMove(cell) {
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        gameActive = false;

        if (currentPlayer === "X") {
            scoreX++;
        } else {
            scoreO++;
        }

        updateScoreboard();

        if (
            gameModeSelect.value === "computer" &&
            currentPlayer === "X"
        ) {
            statusText.textContent = "🎉 You win!";
        } else if (
            gameModeSelect.value === "computer" &&
            currentPlayer === "O"
        ) {
            statusText.textContent = "🤖 Computer wins!";
        } else {
            statusText.textContent =
                `🎉 Player ${currentPlayer} wins!`;
        }

        return;
    }

    if ([...cells].every(cell => cell.textContent !== "")) {
        gameActive = false;
        scoreDraw++;
        updateScoreboard();
        statusText.textContent = "🤝 It's a draw!";
    }
}

function computerMove() {
    // Find all empty cells.
    const emptyCells = [...cells].filter(
        cell => cell.textContent === ""
    );

    if (emptyCells.length === 0 || !gameActive) {
        return;
    }

    // Choose a random empty cell.
    const randomIndex = Math.floor(
        Math.random() * emptyCells.length
    );

    makeMove(emptyCells[randomIndex]);
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            cells[a].textContent !== "" &&
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent
        ) {
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
    computerThinking = false;

    if (gameModeSelect.value === "computer") {
        statusText.textContent = "Your turn (Player X)";
    } else {
        statusText.textContent = "Player X's turn";
    }
}

function changeGameMode() {
    restartGame();
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);

gameModeSelect.addEventListener("change", changeGameMode);

updateScoreboard();
