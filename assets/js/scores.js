
var highScoresList = document.getElementById("highscores");
var userScoresList = [];
var clearButton = document.getElementById("clear");

clearButton.addEventListener("click", clearScores);
init();

function init()
{
    //get the stored user from local storage
    var storedUserScore = JSON.parse(localStorage.getItem("userscore"))
    
    console.log( storedUserScore);
    console.log(typeof(storedUserScore));
    console.log(storedUserScore.score);
    console.log(storedUserScore.initials) 
    userScoresList = storedUserScore;
    // if( storedUserScore != null)
    // {   
    //     renderUserScores(storedUserScore);
    // }
    renderUserScores();
}

function renderUserScores()
{
    var liElement = document.createElement("li");
    liElement.textContent = storeUserScore.score + " " + storedUserScore.initials;

    userScoresList.appendChild(liElement)
}

function clearScores()
{
localStorage.clear();

}