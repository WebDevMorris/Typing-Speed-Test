// Get DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgameElement = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
  "abjure",
  "future",
  "picnic",
  "agonistic",
  "garland",
  "protect",
  "airline",
  "gigantic",
  "publish",
  "bandit",
  "goofy",
  "quadrangle",
  "banquet",
  "government",
  "recount",
  "binoculars",
  "grandnieces",
  "redoubtable",
  "biologist",
  "handbook",
  "reflection",
  "blackboard",
  "himself",
  "reporter",
  "board",
  "indulge",
  "ring",
  "bookworm",
  "inflatable",
  "salesclerk",
  "butterscotch",
  "inimical",
  "snapshot",
  "camera",
  "interim",
  "shellfish",
  "campus",
  "invest",
  "ship",
  "catfish",
  "jackpot",
  "significance",
  "carsick",
  "kitchenette",
  "sometimes",
  "celebrate",
  "law",
  "sublime",
  "celery",
  "life",
  "tabletop",
  "citizen",
  "lifeline",
  "teamwork",
  "coloring",
  "love",
  "tennis",
  "compact",
  "magnificent",
  "timesaving",
  "dark",
  "malevolence",
  "tree",
  "damage",
  "man",
  "termination",
  "dangerous",
  "mascot",
  "underestimate",
  "decorum",
  "marshmallow",
  "vineyard",
  "endorse",
  "mine",
  "war",
  "engender",
  "moonwalk",
  "way",
  "erratic",
  "near",
  "wealth",
  "envelope",
  "nephogram",
  "Wednesday",
  "etymology",
  "newborn",
  "world",
  "eyewitness",
  "noisome",
  "xerox",
  "eulogy",
  "owl",
  "you",
  "fish",
  "parenthesis",
  "zestful",
  "food",
  "perpetrator",
  "foreclose",
  "phone",
  "feline",
  "sunset",
  "reckless",
  "harvest",
  "monastery",
  "whimsical",
  "fountain",
  "vaccine",
  "jury",
  "microphone",
  "honey",
  "dolphin",
  "exotic",
  "pear",
  "guitar",
  "garden",
  "diligent",
  "lighthouse",
  "butterfly",    
  "seashell",
  "almond",
  "umbrella",
  "frost",
  "crescent",
  "rhythm",
  "polar",
  "prison",
  "victorious",
  "wool",
  "cactus",
];

let randomWord;
let score = 0;
let time = 10;
// let difficulty = "medium";
// Retrieve the selected difficulty level from local storage, or set the default difficulty level to "medium"
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Start a timer to update the time remaining every second
const timeInterval = setInterval(updateTime, 1000);

// Get a random word from the words array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Display a new random word on the screen
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// Increment the score and display the updated score on the screen
function updateScore() {
  score++;
  scoreElement.innerText = score;
}

// Decrement the time remaining by 1 second and display the updated time on the screen
// If the time reaches 0, stop the timer and end the game
function updateTime() {
  time--;
  timeElement.innerText = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// Display a message with the final score and a button to play again
function gameOver() {
  endgameElement.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="history.go(0)">Play Again</button>
    `;
  endgameElement.style.display = "flex";
}

// Listen for user input in the text input field
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    // Clear the text input field, display a new random word, and update the score
    e.target.value = "";
    addWordToDom();
    updateScore();
    // Increase the time remaining based on the selected difficulty level
    if (difficulty === "hard") time += 2;
    else if (difficulty === "medium") time += 3;
    else time += 5;
    updateTime();
  }
});

// Toggle the visibility of the settings panel when the settings button is clicked
settingsButton.addEventListener("click", () =>
  settings.classList.toggle("hide")
);

// Update the selected difficulty level when the user changes the value in the difficulty select field,
// and store the new difficulty level in local storage
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

// Initialize the game by setting the difficulty level to the selected value (or the default value),
// displaying a random word

difficultySelect.value = difficulty;
addWordToDom();
text.focus();
