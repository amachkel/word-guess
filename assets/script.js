var timeEl = document.querySelector(".time");
var countDown = 10;
var wordArray = ["kitty", "doggo", "parrot", "gecko"];
var randomWord;
// console.log(randomWord);

var startButton = document.querySelector("#start-button");
//sets game's default to off;
var startRound = "off";
var winCounter = 0;
var lossCounter = 0;

startButton.addEventListener("click", function () {
  if (startRound === "off") {
    startRound = "on";
    newRound();
  } else {
    startRound = "off";
  }
});

function sendMessage(text) {
  timeEl.textContent = text;
}
var timerInterval;

function newRound() {
  randomWord = getRandomWord();
  timerInterval = setInterval(function () {
    countDown--;
    timeEl.textContent = "Countdown: " + countDown;
    //if time runs out, or btn is clicked during round, timer clears & msg displays
    if (countDown === 0 || startRound === "off") {
      clearInterval(timerInterval);
      sendMessage("You lose.");
      //need to be able to start new round when countDown = 0.
      lossCounter++;
      setLosses();
    }
  }, 1000);
  var wordDiv = document.getElementById("word");
  wordDiv.innerHTML = "";
  var splitWord = randomWord.split("");
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
  var wordDiv = document.getElementById("word");
  //creates <span> tag
  var span = document.createElement("span");
  //<span class="letter-holder" data-letter-val= letter>
  span.setAttribute("class", "letter-holder");
  span.setAttribute("data-letter-val", letter);
  //<span> text reads "_ ".
  span.textContent = "_ ";
  //declare div ID as variable to appendChild, or add <span> tag to #word

  wordDiv.appendChild(span);
}

var letterHolders = document.getElementsByClassName("letter-holder");
document.addEventListener("keyup", keyupAction);

function keyupAction(event) {
  determineMatch(event.key, letterHolders);
}

var filledLength = 0;

function determineMatch(key, letterHolders) {
  for (var i = 0; i < letterHolders.length; i++) {
    var letterVal = letterHolders[i].getAttribute("data-letter-val");
    console.log(letterVal);
    if (letterVal == key) {
      var current = letterHolders[i];
      current.textContent = key;
      filledLength++;
    }
    if (filledLength === letterHolders.length) {
      endGame();
      sendMessage("You win!");
      winCounter++;
      setWins();
    }
  }
}

function endGame() {
  clearInterval(timerInterval);
  startRound = "off";
  filledLength = 0;
  countDown = 10;
}

setWins = () => {
  var win = document.querySelector(".win");
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
};

setLosses = () => {
  var loss = document.querySelector(".loss");
  loss.textContent = lossCounter;
  localStorage.setItem("lossCount", lossCounter);
};

getWins = () => {
  let storedWins = localStorage.getItem("winCount");
  if (storedWins === null) {
    winCounter = 0;
  } else {
    winCounter = storedWins;
  }
  win.textContent = winCounter;
};

getLosses = () => {
  let storedLosses = localStorage.getItem("lossCount");
  if (storedLosses === null) {
    lossCounter = 0;
  } else {
    lossCounter = storedLosses;
  }
  loss.textContent = lossCounter;
};
