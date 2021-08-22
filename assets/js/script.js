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
var clear = document.getElementById("resetbutton");
var scoreList = document.querySelector(".highscoredisplay");

var timer;
var timerCount;
var isWin = false;
var winCount = 0;
var lossCount = 0;
var questionNumber = 0;

//DECLARES CHOICE BUTTON ARRAYS
var choiceButtons = [
    document.getElementById("choice1"),
    document.getElementById("choice2"),
    document.getElementById("choice3")
];

//DECLARES QUESTIONS/ANSWERS ARRAY
//Correct answer is chosen by declared Index position.
var questions = [
    {
        "question": "Which brackets are correct syntax to declare an array in JavaScript?",
        "choices": ["[ ]", "< >", "( )"],
        "answer": 0
    },
    {
        "question": "How would you write an Alert with a text box in JavaScript?",
        "choices": ["alert()", "console.log()", "prompt()"],
        "answer": 2
    },
    {
        "question": "Which character is used to declare Wildcard variables in CSS?",
        "choices": ["#", "*", "."],
        "answer": 1
    },
    {
        "question": "What element is used to store multiple values in a single variable in JavaScript?",
        "choices": ["Strings", "Arrays", "Booleans"],
        "answer": 1
    },
    {
        "question": "How do you change the text of an Input field in HTML?",
        "choices": ["Placeholder=", "Types=", "Textarea="],
        "answer": 0
    },
    {
        "question": "Which CSS properties are affected by the Cascade algorithm?",
        "choices": ["Descriptors", "Declarations", "Both"],
        "answer": 1
    },
    {
        "question": "With what do you perform specific tasks with blocks of code in JavaScript?",
        "choices": ["If/Else", "Objects", "Functions"],
        "answer": 2
    },
    {
        "question": "What does '$' symbolize in jQuery?",
        "choices": ["Invokes getElementById", "Invokes jQuery selector function", "Invokes addEventListener"],
        "answer": 1
    },
    {
        "question": "What is jQuery UI?",
        "choices": ["A Web API for User Widgets", "A jQuery function", "An extension of the jQuery library"],
        "answer": 2
    },
    {
        "question": "Which tag is used to make text bold in HTML?",
        "choices": ["<br>", "<em>", "<bold>"],
        "answer": 1
    }
]

//DELCARES HIGH SCORE ARRAY
var scoreBox = [
    document.getElementById("score1"),
    document.getElementById("score2"),
    document.getElementById("score3"),
    document.getElementById("score4"),
    document.getElementById("score5"),
    document.getElementById("score6"),
    document.getElementById("score7"),
    document.getElementById("score8"),
    document.getElementById("score9"),
    document.getElementById("score10")
]


//Add event listener to start and clear score button
start.addEventListener("click", startGame);
clear.addEventListener("click", clearScore)

//On Initialize, enable "clear" button and call getScore to display wins/losses
function init() {
    highScore.style.display = "none";
    clear.disabled = false;
    getScore()
}

//Start game.
function startGame() {
    console.log("Start Game");
    isWin = false;
    timerCount = 60;
    questionNumber = 0;
    start.disabled = true;
    clear.disabled = true;
    choiceWrapper.style.display = "flex";
    winTally.textContent = winCount;
    lossTally.textContent = lossCount;
    highScore.style.display = "none";
    //On startGame, call Timer to countdown, and call for questions to display to the page
    startTimer();
    askQuestion(questions[questionNumber]);
}

//If startGame met, start timer
function startTimer() {
    timer = setInterval(function() {

        //If Win conditions met, clear timer
        if(isWin && timerCount > 0) {
            clearInterval(timer);
        } else {
            timerCount--;

            //Prevents timer from displaying a negative value if count is forced below 0.
            if(timerCount <= 0) {
                timerCount = 0;
            }

            //Displays countdown timer to the page.
            //If timer count value is 0 or lower, clear timer and call loseGame function.
            countdownTimer.textContent = timerCount;
            if (timerCount <= 0) {
                clearInterval(timer);
                loseGame();
            }
        }
    }, 1000);
}

//ASK QUESTIONS
function askQuestion(q) {
    questionBox.textContent = q.question;

    //Display choices to choice buttons, if button's index matches correct answer, call rightAnswer on click.
    for (let i = 0; i < 3; i++) {
        choiceButtons[i].textContent = q.choices[i];
        if (q.answer === i) {
            choiceButtons[i].addEventListener("click", rightAnswer)

            //Otherwise if button index matches incorrect answer, call wrongAnswer on click.
        } else { 
            choiceButtons[i].addEventListener("click", wrongAnswer)
        }
    }
}

//RIGHT ANSWER
function rightAnswer() {

    //If correct answer selected, clear current question and increment to next question in the questions array.
    clearQuestion()
    console.log("right answer");
    questionNumber++
    
    //If user has not incremented/progressed through entire questions array, continue incrementing as long as rightAnswer is met.
    if (questionNumber < questions.length) {
        askQuestion(questions[questionNumber]);
        
        //If user has answered every question in the array correctly, call winGame function.
    } else {
        isWin = true;
        winGame()
    }
}

//WRONG ANSWER
function wrongAnswer() {

    //If wrongAnswer is called, decrement 3 seconds from timer and display new timer count on the page.
    console.log("wrong answer");
    timerCount = timerCount - 3;
}

//CLEAR QUESTION
function clearQuestion() {

    /*If rightAnswer criteria met and clearQuestion called, remove question text from the page and display next question/choices
    in array.*/
    questionBox.textContent = "";
    
    for (let i = 0; i < 3; i++) {
        choiceButtons[i].textContent = "Choice " + (i+1);

        //Removes eventListeners from choice buttons to prevent accidental double clicking, then calls rightAnswer/wrongAnswer again.
        choiceButtons[i].removeEventListener("click", rightAnswer);
        choiceButtons[i].removeEventListener("click", wrongAnswer);
    }
}

//If winGame condition met-
function winGame() {
    console.log("win count- ", winCount);
    console.log("loss count- ", lossCount);
    console.log("you won. cool for you.");

    //Display string of "high score" and remaining timer count, and increment winCount by 1.
    scoreDisplay.textContent = "high score: " + timerCount;
    alertBox.textContent = "you won. cool. enter your initials.";
    winCount++;
    winTally.textContent = winCount;
    lossTally.textContent = lossCount;

    //Enables start and clear buttons
    start.disabled = false;
    clear.disabled = false;

    //Clears final question on the page
    clearQuestion();
    choiceWrapper.style.display = "none";
    highScore.style.display = "block";

    //Adds eventListener on "submit score" button to call submitScore and store win/loss value in local storage.
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
    clear.disabled = false;
    choiceWrapper.style.display = "none";
    clearQuestion();
}

//SUBMIT SCORE
function submitScore() {
    submit.removeEventListener("click", submitScore);
    //When submitScore called, set win and loss values in local storage using key value pair.
    localStorage.setItem("wins" , winCount);
    localStorage.setItem("losses" , lossCount);

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

    for (i = 0; i < 10; i++) {
        if(i < highScores.length) {
            scoreBox[i].textContent = highScores[i].initials + " , " + highScores[i].score;
        }
    }

    console.log("High Scores: " + JSON.stringify(highScores));
}

//GET SCORE ON INIT
function getScore() {
    //On Init, pull wins and loss values out of local storage.
        winCount = localStorage.getItem("wins");
        lossCount = localStorage.getItem("losses");
}

//CLEAR SCORE
function clearScore() {
    //Clears local storage and page displays on "clear" button on 
    console.log("Local storage cleared");
    localStorage.clear();
    winTally.textContent = "";
    lossTally.textContent = "";
    countdownTimer.textContent = "";
    scoreBox.textContent = "";
}

//INITIALIZE
init()