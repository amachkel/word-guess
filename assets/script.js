// const startBtnEl = document.querySelector("#start-button");

// startBtnEl.addEventListener("click", startGame);
// let timerCount;

// function startGame() {
//   timerCount = 10;

//   startBtnEl.disabled = true;
//   renderWordBlanks();
//   countDown();
// };

// const wordArray = ["Kitty", "Doggo", "Lizard", "Parrot", "Fish"];
// let chosenWord = "";
// let chosenLetters = [];
// let letterBlanks = [];
// let wordBlank;

// renderWordBlanks = () => {
//   chosenWord = wordArray[Math.floor(Math.random() * wordArray.length)];
//   chosenLetters = chosenWord.length;

//   for (let i = 0; i < chosenLetters.length; i++) {
//     letterBlanks.push("_");
//   }
//   wordBlank.textContent = letterBlanks.join(" ");
// };

var timeEl = document.querySelector(".time");
var countDown = 10;
var wordArray = ["kitty", "doggo", "parrot", "gecko"];
var randomWord = getRandomWord();
// console.log(randomWord);
var splitWord = randomWord.split("");
var startButton = document.querySelector("#start-button");
//sets game's default to off;
var startRound = "off";

startButton.addEventListener("click", function () {
  if (startRound === "off") {
    startRound = "on";
    newRound();
  } else {
    startRound = "off";
  }
});

function sendMessage() {
  timeEl.textContent = "Game Over";
}

function newRound() {
  var timerInterval = setInterval(function () {
    countDown--;
    timeEl.textContent = "Countdown: " + countDown;
    //if time runs out, or btn is clicked during round, timer clears & msg displays
    if (countDown === 0 || startRound === "off") {
      clearInterval(timerInterval);
      sendMessage();
      //need to be able to start new round when countDown = 0.
    }
  }, 1000);

  for (i = 0; i < splitWord.length; i++) {
    createSpan(splitWord[i]);
  }
}

function getRandomWord() {
  var random = Math.floor(Math.random() * wordArray.length);
  return wordArray[random];
}
//letter paramater = any letter
function createSpan(letter) {
  //creates <span> tag
  var span = document.createElement("span");
  //<span class="letter-holder" data-letter-val= letter>
  span.setAttribute("class", "letter-holder");
  span.setAttribute("data-letter-val", letter);
  //<span> text reads "_ ".
  span.textContent = "_ ";
  //declare div ID as variable to appendChild, or add <span> tag to #word
  var wordDiv = document.getElementById("word");
  wordDiv.appendChild(span);
}

var letterHolders = document.getElementsByClassName("letter-holder");
document.addEventListener("keyup", keyupAction);

function keyupAction(event) {
  determineMatch(event.key, letterHolders);
}

function determineMatch(key, letterHolders) {
  for (var i = 0; i < letterHolders.length; i++) {
    var letterVal = letterHolders[i].getAttribute("data-letter-val");
    console.log(letterVal);
    if (letterVal == key) {
      var current = letterHolders[i];
      current.textContent = key;
    }
  }
}
// check whole array for each key event
