// Selecting DOM elements
const boxes = document.querySelectorAll(".box");
const resetButton = document.querySelector("#reset");
const newGameButton = document.querySelector("#new");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

// Initial player turn
let isPlayer1Turn = true;

// Winning patterns
const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];

// Function to display winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Function to enable all boxes
const enableBoxes = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
};

// Function to reset the game
const resetGame = () => {
    isPlayer1Turn = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }
};

// Event listeners for box clicks
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (!box.innerText) {
            box.innerText = isPlayer1Turn ? "X" : "O";
            isPlayer1Turn = !isPlayer1Turn;
            checkWinner();
        }
    });
});

// Event listeners for reset and new game buttons
resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);
