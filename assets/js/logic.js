//get the html element references in JS variables

var timeElement = document.querySelector("#time");
var timerElement = document.querySelector(".timer");
var startButton = document.querySelector("#start");
var submitButton = document.querySelector("#submit");
var questionTitleElement = document.querySelector("#question-title");
var choicesElement = document.querySelector("#choices");
var feedbackElement = document.querySelector("#feedback");
var userInitialsInput = document.querySelector("#initials");
var finalScoreElement =document.getElementById("final-score");

//get the div elements
var startScreenElement = document.querySelector("#start-screen");
var questionsElement = document.querySelector("#questions");
var endscreenElement = document.querySelector("#end-screen");

//variable initialization
var timerCount = 30;
var timer;
var score = 0;
var currentQuestion = 0;
var penalty = 10;

//create user object from submission
var userScoreObj = {
  score : score,
  initials : userInitialsInput.value.trim()
}

//initialise audio files
const audioCorrectAnswer = new Audio("/assets/sfx/correct.wav")
const audioIncorrectAnswer = new Audio("/assets/sfx/incorrect.wav")


//add an event listener to the start quiz button
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitScore);

function init() {
  timeElement.classList.add("hide");
  timerElement.classList.add("hide");
}

init();
//trigger this function when start button is clicked.
function startQuiz() {
  timeElement.textContent = timerCount;

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

  questionObject.choices.forEach((choice,index) => {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
  //  choiceButton.dataset.index = index + 1; //+1 to set to normal index unlike array
   // choiceButton.addEventListener("click", checkAnswer);

   choiceButton.addEventListener("click", function(){
    checkAnswer(index+1) });
    choicesElement.appendChild(choiceButton);
  });
}

function checkAnswer(index) {
 //let userAnswer = event.target.dataset.index;
 let userAnswer = index;
  feedbackElement.classList.remove("hide");
  
  if (userAnswer == quizData[currentQuestion].answer) {
    score+= 1;
    currentQuestion++;
    audioCorrectAnswer.play();
    feedbackElement.textContent = "Correct";
  } else {
    decrementTime();
    currentQuestion++;
    audioIncorrectAnswer.play();
    feedbackElement.textContent = "Wrong";
  }
  //increment the current index of question in quizData

  //check if this is last question
  if (currentQuestion < quizData.length && timerCount > 0) {
    setTimeout(function () {
      feedbackElement.classList.add("hide");
      displayQuestion();
    }, 500);
  } 
  else {
    setTimeout(function () {
      feedbackElement.classList.add("hide");  clearInterval(timer);
      exitQuiz();
    }, 500);

    return;
  }
}

function decrementTime() {
  alert(timerCount);

  if (timerCount >= 10) {
    timerCount = timerCount - penalty;
    if (timerCount < 0) {
      //clearInterval(timer);
      exitQuiz();
    }
  }
}

function submitScore(event) {
event.preventDefault();

if(userInitialsInput != '')
{
  userScoreObj.score = score;
  userScoreObj.initials = userInitialsInput.value;
  storeUserScore();
  
}
else{
  alert("Please enter your initials");
  //document.querySelector("#initials").focus();
  return;
}

}

function storeUserScore()
{
  //stringify and set "user" key in localstorage to userscore object
  localStorage.setItem("userscore", JSON.stringify(userScoreObj))
  window.location.assign("highscores.html")
}



function exitQuiz() {
 
  questionsElement.classList.add("hide");
  endscreenElement.classList.remove("hide");
  init();
  finalScoreElement.textContent = score + ". You answered " + score + " out of "+ quizData.length
}

//start timer when the start quiz button is clicked
function startTimer() {
  timer = setInterval(function () {
    //alert(timerCount)

    timerCount--;
    timeElement.textContent = timerCount;

    //check if the time is run out
    if (timerCount >= 0) {
      //console.log(timerCount + "TIme is Up");
    }

    if (timerCount < 0) {
      clearInterval(timer);
      exitQuiz();
    }
  }, 1000);
}
