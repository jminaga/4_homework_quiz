
let quizStart = document.querySelector("#beginBtn");
let timeDisplay = document.querySelector(".timer");
let gameDisplay = document.querySelector("#gameDisplay");
let response = document.querySelector("#response");
let scoreDisplay = document.querySelector("#scoreDisplay");
let initials = document.querySelector("#initials");
let submitBtn = document.querySelector("#submitBtn");
let backBtn = document.querySelector("#backBtn");
let answer = document.querySelector("#answer");


let choices = document.querySelector("#choices");
let choice1 = document.querySelector("#choice1");
let choice2 = document.querySelector("#choice2");
let choice3 = document.querySelector("#choice3");
let choice4 = document.querySelector("#choice4");


let timeLeft = 100;
let q = 0;
let s = 0;
let score = 0;
let scoreList = [];
let timeInterval;

getScore();

// Timer
function setTimer() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timeDisplay.textContent = "Time Left: " + timeLeft;

    if (timeLeft === 0 || q >= questions.length) {
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

//  Display questions
function displayQuestions() {
  if (q < questions.length) {
    question.textContent = questions[q].question;
    choice1.textContent = questions[q].selection[0];
    choice2.textContent = questions[q].selection[1];
    choice3.textContent = questions[q].selection[2];
    choice4.textContent = questions[q].selection[3];
  } else {
    gameOver();
  }
}

// Right or wrong answer function
function compareAnswer(event) {
  if (q >= questions.length) {
    gameOver();
    clearInterval(timeInterval);
  } else {
    if (event === questions[q].answer) {
      response.textContent = "You are correct!";
    } else {
      timeLeft -= 10;
      response.textContent = "You are Wrong!";
    }
    score = timeLeft;
    q++;
    displayQuestions();
  }
}


// Getting scores from local storage
function getScore() {
  var storedScore = JSON.parse(localStorage.getItem("highScore"));
  if (storedScore !== null) {
    scoreList = storedScore;
  }
}

// Saving the scores to local storage
function saveScore() {
  localStorage.setItem("highScore", JSON.stringify(scoreList));
}

// Score display
function gameOver() {
  scoreShow.innerHTML = score;
  scoreShow.style.display = "inline-block";
  gameDisplay.classList.add("hide");
  
  timeDisplay.classList.add("hide");
  
  scoreBoard();
}



function scoreBoard() {
  removeFromScoreBoard();
  addToScoreBoard();
  scoreList.sort((a, b) => {
    return b.score - a.score;
  });
  topTen = scoreList.slice(0, 10);

  for (let i = 0; i < topTen.length; i++) {
    let player = topTen[i].player;
    let score = topTen[i].score;

    let newDiv = document.createElement("div");
    scoreBoardDiv.appendChild(newDiv);

    var newLabel = document.createElement("label");
    newLabel.textContent = player + " - " + score;
    newDiv.appendChild(newLabel);
  }
}


// Start quiz
quizStart.addEventListener("click", function (event) {
  setTimer();
  displayQuestions();
  gameDisplay.classList.remove("hide");

});

// Adding player initials to leader board
function addToScoreBoard() {
  scoreBoardDiv = document.createElement("div");
  scoreBoardDiv.setAttribute("id", "playerInitials");
  document.getElementById("scoreBoard").appendChild(scoreBoardDiv);
}


// Removing player initials from score board
function removeFromScoreBoard() {
  var removeScores = document.getElementById("playerInitials");
  if (removeScores !== null) {
    removeScores.remove();
  } else {
  }
}

choices.addEventListener("click", function (event) {
  var event = event.target;
  compareAnswer(event.textContent.trim());
});


// submit and go back button
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let playerInitials = initials.value.trim();
  let newScore = {
    player: playerInitials,
    score: score,
  };
  
  scoreList.push(newScore);
  saveScore();
  scoreBoard();
  
  
});

backBtn.addEventListener("click", function (event) {
  location.reload();
});

// Clear score board
clearBtn.addEventListener("click", function (event) {
  scoreList = [];
  localStorage.setItem("highScore", JSON.stringify(scoreList));
  scoreBoard();
  saveScore();
});