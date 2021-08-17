//GLOBAL VARIABLES
var countdownTimer = document.getElementById("timerdisplay");
var winTally = document.getElementById("wintally");
var lossTally = document.getElementById("losstally");
var scoreCounter = document.querySelector(".score");
var wins = document.getElementById("wins");
var loss = document.getElementById("losses");
var winLoss = document.querySelector(".winlossdisplay");

var start = document.querySelector(".startbutton");
var choiceButton = document.querySelector(".choice");

var timer;
var timerCount;
var isWin = false;
var winCount = 0;
var lossCount = 0;



//FUNCTIONS

//Add event listener to start button
start.addEventListener("click", startGame)

function init() {
    getWins();
    getLosses();
}

//Start game.
function startGame() {
    console.log("Start Game");
    isWin = false;
    timerCount = 60;
    start.disabled = true;
    startTimer()
}

//If startGame met, start timer
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        countdownTimer.textContent = timerCount;
        if (timerCount >= 0) {
            if (isWin && timerCount > 0) {
                clearInterval(timer);
                winGame();
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

//If winGame condition met-
function winGame() {
    console.log("you won. cool for you.");
    winLoss.textContent = "you won. cool.";
    winCount++;
    start.disabled = false;
    setWin();
}

//if loseGame condition met- 
function loseGame() {
    console.log("you lost. sucks.");
    winLoss.textContent = "fuck you get good.";
    lossCount++
    start.disabled = false;
    setLoss();
}

//if setWin condition met- 
function setWin() {
    wins.textContent = winCount;
    localStorage.setItem("winCount", winCount);
}

//if setLoss condition met-
function setLoss() {
    loss.textContent = lossCount;
    localStorage.setItem("lossCount", lossCount);
}

function getWins() {
    var storedWins = localStorage.getItem("winCount");
    if (storedWins === null) {
        winCount = 0;
    } else {
        winCount = storedWins;
    }
    wins.textContent = winCount;
}

function getLosses() {
    var storedLosses = local.localStorage.getItem("loseCount");
    if (storedLosses === null) {
        lossCount = 0;
    } else {
        lossCount = storedLosses;
    }
    loss.textContent = lossCount;
}




//INITIALIZE
init()