var timeEl = document.querySelector(".time");
var countDown = 10;
var wordArray = ["kitty", "doggo", "parrot", "gecko"];
var randomWord = Math.floor(Math.random() * wordArray.length);
var startButton = document.querySelector("#start-button");
//sets game's default to off;
var startRound = "off";
function newRound() {
  var timerInterval = setInterval(function () {
    countDown--;
    timeEl.textContent = "Countdown: " + countDown;

    for (i = 0; i < randomWord; i++);

    if (countDown === 0 || startRound === "off") {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
}

document.getElementById("word").textContent = wordArray[randomWord];

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

function keydownAction(event) {
  var keyPress = event.key;
  //need code block here
  document.querySelector(".letter");
}

//loop through the word
//creat a span with class letter-holder
//add an attribute "data-letter-val" and give it the value of the current letter in loop.
//then attach the spans to your html

//check whole array for each key event
