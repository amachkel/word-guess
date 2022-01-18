var timeEl = document.querySelector(".time");
var countDown = 10;

function setTime() {
    var timerInterval = setInterval(function() {
countDown--;
timeEl.textContent = "Countdown: " + countDown;

if (countDown === 0) {
    clearInterval(timerInterval);
    sendMessage();
}
    }, 1000);
}

function sendMessage() {
    timeEl.textContent = "Game Over";
}

setTime();