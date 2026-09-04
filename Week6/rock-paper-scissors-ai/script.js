const choices = ["rock", "paper", "scissors"];

const score = {
  player: 0,
  computer: 0
};

let gameStarted = false;

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const choiceButtons = document.querySelectorAll(".choice-btn");

const turn = document.getElementById("turn");
const playerChoiceDisplay = document.getElementById("player-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const resultDisplay = document.getElementById("result");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");


function startGame() {
  gameStarted = true;

  startButton.hidden = true;
  restartButton.hidden = false;

  choiceButtons.forEach((button) => {
    button.disabled = false;
  });

  turn.textContent = "Choose your move!";
  resultDisplay.textContent = "Make your move!";
}


function restartGame() {
  gameStarted = true;

  score.player = 0;
  score.computer = 0;

  playerScoreDisplay.textContent = score.player;
  computerScoreDisplay.textContent = score.computer;

  playerChoiceDisplay.textContent = "-";
  computerChoiceDisplay.textContent = "-";

  resultDisplay.textContent = "Make your move!";
  turn.textContent = "Choose your move!";
}


function playGame(playerChoice) {
  if (!gameStarted) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * choices.length);
  const computerChoice = choices[randomIndex];

  playerChoiceDisplay.textContent = playerChoice;
  computerChoiceDisplay.textContent = computerChoice;

  let result;

  if (playerChoice === computerChoice) {
    result = "It's a draw! 🤝";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You win! 🎉";
    score.player++;
  } else {
    result = "Computer wins! 🤖";
    score.computer++;
  }

  resultDisplay.textContent = result;

  playerScoreDisplay.textContent = score.player;
  computerScoreDisplay.textContent = score.computer;
}


startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", restartGame);