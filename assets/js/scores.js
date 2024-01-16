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
 
  //sort the user score in descdening order of scores-userinitials
  highScores.sort((a, b) => {
    if (a.uscore > b.uscore) {
      return -1;
    }
    debugger;
    if (a.uscore < b.uscore) {
      return 1;
    }
    if (highScores.indexOf(a) > highScores.indexOf(b)) {
      return 1;
    }
    return -1;
  })

  //iterate the userscores and append to OL list element
  for (let i = 0; i < highScores.length; i++) {
    //create li html element
    var liElement = document.createElement("li");
    //assign score + user initials to the li element
    liElement.textContent = highScores[i].uscore + " " + highScores[i].initials;
    //add the li element to ol
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
