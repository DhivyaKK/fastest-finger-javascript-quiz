var highScoresList = document.getElementById("highscores");
var clearButton = document.getElementById("clear");
var userAllScoresObj =  JSON.parse(localStorage.getItem("userscore"));

//eventlistener to clear local storage key value pairs
clearButton.addEventListener("click", clearScores);
var highScores = JSON.parse(localStorage.getItem("userscore"));

init();

function init()
{
    //get the stored user from local storage
    console.log(userAllScoresObj)

    renderUserScores();
}

function renderUserScores()
{
    //debugger;
    
    for(let i= 0; i < highScores.length; i++)
    {
    var liElement = document.createElement("li");
     liElement.textContent = highScores[i].uscore + " " + highScores[i].initials;
     highScoresList.appendChild(liElement)
    }
}

function clearScores()
{
highScoresList.textContent = "";

localStorage.clear();


}