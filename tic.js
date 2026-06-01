const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");

const xScoreEl = document.getElementById("xScore");
const oScoreEl = document.getElementById("oScore");
const drawScoreEl = document.getElementById("drawScore");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = true;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellClick() {

    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive){
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer.toLowerCase());

    checkWinner();
}

function checkWinner() {

    let roundWon = false;

    for(let condition of winningConditions){

        const [a,b,c] = condition;

        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ){

            roundWon = true;

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            break;
        }
    }

    if(roundWon){

        statusText.textContent =
            `Player ${currentPlayer} Wins!`;

        gameActive = false;

        if(currentPlayer === "X"){
            xScore++;
            xScoreEl.textContent = xScore;
        }else{
            oScore++;
            oScoreEl.textContent = oScore;
        }

        return;
    }

    if(!board.includes("")){

        statusText.textContent = "It's a Draw!";
        drawScore++;
        drawScoreEl.textContent = drawScore;
        gameActive = false;
        return;
    }

    currentPlayer =
        currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        `Player ${currentPlayer}'s Turn`;
}

function restartGame(){

    board = ["","","","","","","","",""];
    currentPlayer = "X";
    gameActive = true;

    statusText.textContent =
        "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove(
            "x",
            "o",
            "winner"
        );
    });
}

function resetScores(){

    xScore = 0;
    oScore = 0;
    drawScore = 0;

    xScoreEl.textContent = 0;
    oScoreEl.textContent = 0;
    drawScoreEl.textContent = 0;

    restartGame();
}

cells.forEach(cell =>
    cell.addEventListener(
        "click",
        handleCellClick
    )
);

restartBtn.addEventListener(
    "click",
    restartGame
);

resetBtn.addEventListener(
    "click",
    resetScores
);