//GLOBAL VARIABLES
var countdownTimer = document.getElementById("timerdisplay");
var winTally = document.getElementById("wintally");
var lossTally = document.getElementById("losstally");
var scoreCounter = document.getElementById("score");
var winLoss = document.querySelector(".winlossdisplay");
var questionBox = document.getElementById("questionbox");
var alertBox = document.getElementById("rightwrongalert");
var scoreDisplay = document.getElementById("scoredisplay");
var button = document.querySelector(".choice");
var choiceWrapper = document.querySelector(".choicewrapper");
var highScore = document.getElementById("formwrapper");
var submit = document.getElementById("submitbutton");
var start = document.querySelector(".startbutton");
var scoreList = document.querySelector(".highscoredisplay");

var timer;
var timerCount;
var isWin = false;
var winCount = 0;
var lossCount = 0;
var questionNumber = 0;

//ARRAYS
var choiceButtons = [
    document.getElementById("choice1"),
    document.getElementById("choice2"),
    document.getElementById("choice3")
];

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

var scoreBox = [
    document.getElementById("score1"),
    document.getElementById("score2"),
    document.getElementById("score3"),
    document.getElementById("score4")
]

//FUNCTIONS

//Add event listener to start button
start.addEventListener("click", startGame)

function init() {
    highScore.style.display = "none";
    // submitScore()
}

//Start game.
function startGame() {
    console.log("Start Game");
    isWin = false;
    timerCount = 60;
    questionNumber = 0;
    start.disabled = true;
    choiceWrapper.style.display = "flex";
    winTally.textContent = winCount;
    lossTally.textContent = lossCount;
    highScore.style.display = "none";
    startTimer();
    askQuestion(questions[questionNumber]);
}

//If startGame met, start timer
function startTimer() {
    timer = setInterval(function() {
        if(isWin && timerCount > 0) {
            clearInterval(timer);
        } else {
            timerCount--;
            if(timerCount <= 0) {
                timerCount = 0;
            }
            countdownTimer.textContent = timerCount;
            if (timerCount <= 0) {
                clearInterval(timer);
                loseGame();
            }
        }
    }, 1000);
}

//Questions
function askQuestion(q) {
    questionBox.textContent = q.question;

    for (let i = 0; i < 3; i++) {
        choiceButtons[i].textContent = q.choices[i];
        if (q.answer === i) {
            choiceButtons[i].addEventListener("click", rightAnswer)
        } else { 
            choiceButtons[i].addEventListener("click", wrongAnswer)
        }
    }
}

function rightAnswer() {
    clearQuestion()
    console.log("right answer");
    alertBox.textContent = "right!";
    questionNumber++
    
    if (questionNumber < 1) {
        askQuestion(questions[questionNumber]);
    } else {
        isWin = true;
        winGame()
    }
}

function wrongAnswer() {
    console.log("wrong answer");
    alertBox.textContent = "wrong.";
    timerCount = timerCount - 3;
}

function clearQuestion() {
    console.log("questions cleared");
    questionBox.textContent = "";
    
    for (let i = 0; i < 3; i++) {
        choiceButtons[i].textContent = "Choice " + (i+1);

        choiceButtons[i].removeEventListener("click", rightAnswer);
        choiceButtons[i].removeEventListener("click", wrongAnswer);
    }
}

//If winGame condition met-
function winGame() {
    console.log("win count- ", winCount);
    console.log("loss count- ", lossCount);
    console.log("you won. cool for you.");
    scoreDisplay.textContent = "high score: " + timerCount;
    alertBox.textContent = "you won. cool. enter your initials.";
    winCount++;
    winTally.textContent = winCount;
    lossTally.textContent = lossCount;
    start.disabled = false;
    clearQuestion();
    // setWin();
    choiceWrapper.style.display = "none";
    highScore.style.display = "block";
    submit.addEventListener("click", submitScore);
}

//if loseGame condition met- 
function loseGame() {
    console.log("win count- ", winCount);
    console.log("loss count- ", lossCount);
    console.log("you lost. sucks.");
    lossCount++
    winTally.textContent = winCount;
    lossTally.textContent = lossCount;
    alertBox.textContent = "you lost. sucks.";
    start.disabled = false;
    choiceWrapper.style.display = "none";
    clearQuestion();
    // setLoss();
}

function submitScore() {
    submit.removeEventListener("click", submitScore);
    // localStorage.getItem(winCount, lossCount);
    localStorage.setItem(winCount, lossCount);

    var initials = document.getElementById("inputform").value;
    var scoreObj = {
        "initials": initials,
        "score": timerCount
    }
    var highScores;

    if (localStorage.getItem("highScores")) {
        highScores = JSON.parse(localStorage.getItem("highScores"));

        if (!Array.isArray(highScores)) {
            highScores = [];
        }
    } else {
        highScores = [];
    }
    
    highScores.push(scoreObj);
    localStorage.setItem("highScores", JSON.stringify(highScores));

    highScores.sort((a, b) => {
        return(b.score - a.score)
    })

    for (i = 0; i < 4; i++) {
        if(i < highScores.length) {
            scoreBox[i].textContent = highScores[i].initials + " , " + highScores[i].score;
        }
    }

    console.log("High Scores: " + JSON.stringify(highScores));
}

//INITIALIZE
init()