const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true; // Player O starts
let count = 0; // To track the number of moves

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
  });
  msgContainer.classList.add("hide");
};

const checkWinner = () => {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern.map(i => boxes[i].innerText);
    if (a && a === b && b === c) {
      showMessage(`Congratulations, Winner is ${a}`);
      return true;
    }
    return false;
  });
};

const showMessage = message => {
  msg.innerText = message;
  msgContainer.classList.remove("hide");
  boxes.forEach(box => box.disabled = true);
};

boxes.forEach(box => {
  box.addEventListener("click", () => {
    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    turnO = !turnO;
    count++;

    if (checkWinner()) return;
    if (count === 9) showMessage("Game was a Draw.");
  });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
