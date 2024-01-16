//var declaration for html DOM elements
var highScoresList = document.getElementById("highscores");
var clearButton = document.getElementById("clear");

//get the local storage value into var
var highScores = JSON.parse(localStorage.getItem("userscore"));

//eventlistener to clear local storage key value pairs
clearButton.addEventListener("click", clearScores);

//call fn to render the user scores
renderUserScores();

function renderUserScores() {
  //iterate the userscores and append OL list
  for (let i = 0; i < highScores.length; i++) {
    var liElement = document.createElement("li");
    liElement.textContent = highScores[i].uscore + " " + highScores[i].initials;
    highScoresList.appendChild(liElement);
  }
}

//reset the local storage to empty value on clearscore btn click
function clearScores() {
  highScoresList.textContent = "";
  highScores = [];
  //clear any localstorage values
  localStorage.setItem("userscore", JSON.stringify(highScores));
}
