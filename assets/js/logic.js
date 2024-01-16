//get the html element references in JS variables
//timer elements
var timeElement = document.querySelector("#time");
var timerElement = document.querySelector(".timer");

//button elements
var startButton = document.querySelector("#start");
var submitInitialsBtn = document.querySelector("#submit");

var questionTitleElement = document.querySelector("#question-title");
var choicesElement = document.querySelector("#choices");
var feedbackElement = document.querySelector("#feedback");
var userInitialsInput = document.querySelector("#initials");
var finalScoreElement = document.getElementById("final-score");

//get the div elements
var startScreenElement = document.querySelector("#start-screen");
var questionsElement = document.querySelector("#questions");
var endscreenElement = document.querySelector("#end-screen");

//variable initialization
var timeGiven = 60;
var timer;
var score = 0;
var currentQuestion = 0;
var penalty = 10;

//variables to store scored
var highscores = [];

//initialise audio files
const audioCorrectAnswer = new Audio("/assets/sfx/correct.wav");
const audioIncorrectAnswer = new Audio("/assets/sfx/incorrect.wav");

//add an event listener to the start quiz button
startButton.addEventListener("click", startQuiz);
submitInitialsBtn.addEventListener("click", submitQuiz);

function init() {
  timeElement.classList.add("hide");
  timerElement.classList.add("hide");
}

init();
//trigger this function when start button is clicked.
function startQuiz() {
  timeElement.textContent = timeGiven;

  //hide the start-screen when startquiz button is clicked
  startScreenElement.classList.add("hide");

  //remove the class hide to load the questions
  questionsElement.classList.remove("hide");

  //remove the class hide to display the timer
  timeElement.classList.remove("hide");
  timerElement.classList.remove("hide");

  //load the questions
  displayQuestion();

  //begin the timer
  startTimer();
}

function displayQuestion() {
  if (currentQuestion >= quizData.length) {
    exitQuiz();
    return;
  }

  var questionObject;
  choicesElement.textContent = "";
  questionObject = quizData[currentQuestion];
  questionTitleElement.innerHTML = questionObject.question;
  questionObject.choices.forEach((choice, index) => {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.addEventListener("click", function () {
      checkAnswer(index + 1);
    });
    choicesElement.appendChild(choiceButton);
  });
}

function checkAnswer(index) {
  let userAnswer = index;
  feedbackElement.classList.remove("hide");

  if (userAnswer == quizData[currentQuestion].answer) {
    score += 1;
    //increment the current index of question
    currentQuestion++;
    audioCorrectAnswer.play();
    feedbackElement.textContent = "Correct";
  } else {
    decrementTime();
    currentQuestion++;
    audioIncorrectAnswer.play();
    feedbackElement.textContent = "Wrong";
  }

  //check if this is last question
  if (currentQuestion < quizData.length && timeGiven > 0) {
    setTimeout(function () {
      feedbackElement.classList.add("hide");
      displayQuestion();
    }, 500);
  } else {
    setTimeout(function () {
      feedbackElement.classList.add("hide");
      clearInterval(timer);
      exitQuiz();
    }, 500);

    return;
  }
}

function decrementTime() {
  // alert(timeGiven);

  if (timeGiven >= 10) {
    timeGiven = timeGiven - penalty;
    if (timeGiven < 0) {
      //clearInterval(timer);
      exitQuiz();
    }
  }
}

function submitQuiz(event) {
  event.preventDefault();

  //check if the input textbox is not empty
  let initValue = userInitialsInput.value.trim();

  // if (userInitialsInput.value.trim() != "") {
  if (initValue) {
    let userScoreObj = { uscore: score, initials: initValue };
    userInitialsInput.value = "";
    highscores = JSON.parse(localStorage.getItem("userscore")) || [];
    debugger;
    highscores.push(userScoreObj);
    debugger;
    localStorage.setItem("userscore", JSON.stringify(highscores));
  } else {
    return;
  }
  //redirect to screen to load the user scores and initials
  window.location.assign("highscores.html");
}

function exitQuiz() {
  questionsElement.classList.add("hide");
  endscreenElement.classList.remove("hide");
  init();
  finalScoreElement.textContent =
    score + ". You answered " + score + " out of " + quizData.length;
}

//start timer when the start quiz button is clicked
function startTimer() {
  timer = setInterval(function () {
    timeGiven--;
    timeElement.textContent = timeGiven;

    //check if the time is run out
    if (timeGiven >= 0) {
    }

    if (timeGiven < 0) {
      clearInterval(timer);
      exitQuiz();
    }
  }, 1000);
}
