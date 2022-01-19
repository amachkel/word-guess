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
  var wordDiv = document.getElementById("word");
  wordDiv.appendChild(span);
}

function keydownAction(event) {
  var keyPress = event.key;
  //need code block here
  document.querySelector(".letter");
}

// for (i = 0; i < randomWord; i++);

//loop through the word
//create a span with class letter-holder
//add an attribute "data-letter-val" and give it the value of the current letter in loop.
//then attach the spans to your html

//check whole array for each key event
