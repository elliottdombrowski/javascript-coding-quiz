//GLOBAL VARIABLES
var countdownTimer = document.getElementById("timerdisplay");
var winTally = document.getElementById("wintally");
var lossTally = document.getElementById("losstally");
var scoreCounter = document.getElementById("score");
// var wins = document.getElementById("wins");
// var loss = document.getElementById("losses");
var winLoss = document.querySelector(".winlossdisplay");
var questionBox = document.getElementById("questionbox");
var button = document.querySelector(".choice");

var start = document.querySelector(".startbutton");
var choiceButton1 = document.getElementById("choice1");
var choiceButton2 = document.getElementById("choice2");
var choiceButton3 = document.getElementById("choice3");

var timer;
var timerCount;
var isWin = false;
var winCount = 0;
var lossCount = 0;
var questionNumber = 0;

//Array for questions/answers
// var questions = [
//     {
//         "question": "what should i be asking",
//         "answer": "whatever.",
//         "fakeanswer": "nothing.",
//         "fakeanswer2": "nothing again."
//     }, 
//     {
//         "question": "do you understand yet?",
//         "answer": "no.",
//         "fakeanswer": "yes.",
//         "fakeanswer2": "yes again."
//     },
//     {
//         "question": "What color is the sky?",
//         "choices": ["red", "blue", "green"],
//         "answer": 1
//     }
// ]

var questions = [
    {
        "question": "placeholder question 1",
        "choices": ["true", "false", "false"],
        "answer": 0
    },
    {
        "question": "placeholder question 2",
        "choices": ["false", "false", "true"],
        "answer": 2
    },
    {
        "question": "placeholder question 3",
        "choices": ["false", "true", "false"],
        "answer": 1
    },
    {
        "question": "placeholder question 4",
        "choices": ["false", "true", "false"],
        "answer": 1
    },
    {
        "question": "placeholder question 5",
        "choices": ["false", "true", "false"],
        "answer": 1
    },
    {
        "question": "placeholder question 6",
        "choices": ["false", "true", "false"],
        "answer": 1
    },
    {
        "question": "placeholder question 7",
        "choices": ["false", "true", "false"],
        "answer": 1
    },
    {
        "question": "placeholder question 8",
        "choices": ["false", "true", "false"],
        "answer": 1
    }
]

//FUNCTIONS

//Add event listener to start button
start.addEventListener("click", startGame)

// function init() {
//     getWins();
//     getLosses();
// }

//Start game.
function startGame() {
    console.log("Start Game");
    isWin = false;
    timerCount = 60;
    questionNumber = 0;
    start.disabled = true;
    winTally.textContent = winCount;
    startTimer();
    askQuestion(questions[questionNumber]);
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

//Questions
function askQuestion(q) {
    questionBox.textContent = q.question;
    choiceButton1.textContent = q.choices[0];
    choiceButton2.textContent = q.choices[1];
    choiceButton3.textContent = q.choices[2];
    
    choiceButton1.addEventListener("click", () => {buttonClick(1, 1)})
    choiceButton2.addEventListener("click", () => {buttonClick(2, 1)})
    choiceButton3.addEventListener("click", () => {buttonClick(3, 1)})
}

function buttonClick(buttonNumber, correctNumber) {
    
    if(buttonNumber === correctNumber) {
        questionNumber++
        rightAnswer();
        askQuestion(questions[questionNumber]);
    } else {
        timerCount = timerCount - 3;
    }
}

function rightAnswer() {
    winCount++;
}

function clearQuestion() {
    console.log("questions cleared");
    questionBox.textContent = "";
    choiceButton1.textContent = "";
    choiceButton2.textContent = "";
    choiceButton3.textContent = "";
}

//If winGame condition met-
function winGame() {
    console.log("you won. cool for you.");
    winLoss.textContent = "you won. cool.";
    winCount++;
    start.disabled = false;
    clearQuestion();
    // setWin();
}

//if loseGame condition met- 
function loseGame() {
    console.log("you lost. sucks.");
    winLoss.textContent = "fuck you get good.";
    lossCount++
    start.disabled = false;
    clearQuestion();
    // setLoss();
}

//if setWin condition met- 
// function setWin() {
//     wins.textContent = winCount;
//     localStorage.setItem("winCount", winCount);
// }

// //if setLoss condition met-
// function setLoss() {
//     loss.textContent = lossCount;
//     localStorage.setItem("lossCount", lossCount);
// }

// function getWins() {
//     var storedWins = localStorage.getItem("winCount");
//     if (storedWins === null) {
//         winCount = 0;
//     } else {
//         winCount = storedWins;
//     }
//     wins.textContent = winCount;
// }

// function getLosses() {
//     var storedLosses = local.localStorage.getItem("loseCount");
//     if (storedLosses === null) {
//         lossCount = 0;
//     } else {
//         lossCount = storedLosses;
//     }
//     loss.textContent = lossCount;
// }




//INITIALIZE
// init()