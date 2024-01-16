//get the html element references in JS variables
//timer elements
var timeElement = document.querySelector("#time");
var timerElement = document.querySelector(".timer");

//button elements
var startButton = document.querySelector("#start");
var submitInitialsBtn = document.querySelector("#submit");

//get html element references
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

init();

//on page load, hide the timer and time
function init() {
  timeElement.classList.add("hide");
  timerElement.classList.add("hide");
}

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

  //call to load the questions
  displayQuestion();

  //call to begin the timer
  startTimer();
}

//TODO : display the questions and answer choices
function displayQuestion() {

  var questionObject;
  choicesElement.textContent = "";

  //check if end of the quiz
  if (currentQuestion >= quizData.length) {
    exitQuiz();
    return;
  }

  questionObject = quizData[currentQuestion];

  //assign question
  questionTitleElement.innerHTML = questionObject.question;
  //iterate the choices for question
  questionObject.choices.forEach((choice, index) => {
    //create a button for each choice
    var choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    
    //evaluate user selected answer on click
    choiceButton.addEventListener("click", function () {
      checkAnswer(index + 1);
    });
    choicesElement.appendChild(choiceButton);
  });
}

//TODO: Evaluate the user selected answer and display if the answer is correct or wrong
function checkAnswer(index) {
  let userAnswer = index;
  feedbackElement.classList.remove("hide");

  if (userAnswer == quizData[currentQuestion].answer) {
    score += 1;
    //increment the current index of question
    currentQuestion++;
    audioCorrectAnswer.play();
    feedbackElement.textContent = "Correct!";
  } else {
    decrementTime();
    currentQuestion++;
    audioIncorrectAnswer.play();
    feedbackElement.textContent = "Wrong!";
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

//TODO: Decrement 10 seconds from timer for every wrong answer
function decrementTime() {
  // alert(timeGiven);

  if (timeGiven >= 10) {
    //penalty = 10 seconds
    timeGiven = timeGiven - penalty;
    if (timeGiven < 0) {
      //clearInterval(timer);
      exitQuiz();
    }
  }
}

//TODO: submit the quiz
function submitQuiz(event) {
  event.preventDefault();

  //check if the input textbox is not empty
  let initValue = userInitialsInput.value.trim();

  //if user has entered the initials and on submit
  if (initValue) {
    let userScoreObj = { uscore: score, initials: initValue };
    userInitialsInput.value = "";
    //if user attempts quiz first time
    highscores = JSON.parse(localStorage.getItem("userscore")) || [];
    
    //store user scores for subsequent attempts
    highscores.push(userScoreObj);
    
    //store user score in local storage to access in highscore.html
    localStorage.setItem("userscore", JSON.stringify(highscores));
  } 
  //if no initials is entered and on submit, 
  else
  {
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
    //continue to decrement timer on start of quiz
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
