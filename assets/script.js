const timeEl = document.querySelector(".time");
let countDown = 10;
const wordArray = ["cat", "dog", "parrot", "fish", "snake", "gecko"];
let randomWord;
// console.log(randomWord);
let letterHolders;

const startButton = document.querySelector("#start-button");
//sets game's default to off;
let startRound = "off";
let winCounter = 0;
let lossCounter = 0;

startButton.addEventListener("click", function () {
  if (startRound === "off") {
    startRound = "on";
    newRound();
  } else {
    startRound = "off";
  }
});

sendMessage = (text) => (timeEl.textContent = text);
let timerInterval;

newRound = () => {
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
  const wordDiv = document.getElementById("word");
  wordDiv.innerHTML = "";
  let splitWord = randomWord.split("");
  for (i = 0; i < splitWord.length; i++) {
    createSpan(splitWord[i]);
  }
  letterHolders = document.getElementsByClassName("letter-holder");
};

getRandomWord = () => {
  let random = Math.floor(Math.random() * wordArray.length);
  return wordArray[random];
};
//letter paramater = any letter
createSpan = (letter) => {
  const wordDiv = document.getElementById("word");
  //creates <span> tag
  const span = document.createElement("span");
  //<span class="letter-holder" data-letter-val= letter>
  span.setAttribute("class", "letter-holder");
  span.setAttribute("data-letter-val", letter);
  //<span> text reads "_ ".
  span.textContent = "_ ";
  //declare div ID as variable to appendChild, or add <span> tag to #word

  wordDiv.appendChild(span);
};

console.log(letterHolders);
document.addEventListener("keyup", keyupAction);

function keyupAction(event) {
  determineMatch(event.key, letterHolders);
}

function isTrue(element, index, array) {
  return element == true;
}

var foundLetters = [];
determineMatch = (key, letterHolders) => {
  for (let i = 0; i < letterHolders.length; i++) {
    let letterVal = letterHolders[i].getAttribute("data-letter-val");
    if (letterVal == key 
      && foundLetters.length != letterHolders.length) {
      let current = letterHolders[i];
      current.textContent = key;
      foundLetters.push(true);
      console.log(foundLetters.length);
    }
  }
  let trueLen = foundLetters.length;
  if (trueLen == letterHolders.length 
    && startRound == "on") {
    endGame();
    sendMessage("You win!");
    winCounter++;
    setWins();
  }
};

endGame = () => {
  clearInterval(timerInterval);
  startRound = "off";
  countDown = 10;
  foundLetters = [];
};

setWins = () => {
  const win = document.querySelector(".win");
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
};

setLosses = () => {
  const loss = document.querySelector(".loss");
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
