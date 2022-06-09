var ATTEMPTS = 6;
var LENGTH = 5;

var correctWord = "";
var currentGuess = "";
var guesses = [];
var allowed = [];
var answers = [];
var gameOver = false;

function fetchWordList() {
  fetch("https://api.jsonbin.io/b/629f9937402a5b38021f6b38").then(function (response) {
    response.json().then(function (data) {
      allowed = data.allowed.concat(data.answers);
      answers = data.answers;
      randomizeWord();
    });
  });
}

function randomizeWord() {
  var index = Math.floor(Math.random() * answers.length);
  correctWord = answers[index];
  console.log("the answer is", correctWord);
}

function checkWord(correct, guess) {
  var result = [0, 0, 0, 0, 0];
  var letters = correct.split("");

  // mark 1 for green letters
  for (var i = 0; i < LENGTH; i += 1) {
    if (guess[i] == letters[i]) {
      letters[i] = null;
      result[i] = 1;
    }
  }

  // mark 2 for yellow letters
  for (var i = 0; i < LENGTH; i += 1) {
    var index = letters.indexOf(guess[i]);
    if (index >= 0 && result[i] == 0) {
      letters[index] = null;
      result[i] = 2;
    }
  }

  return result;
}

function updateGuesses() {
  var guessesDiv = document.querySelector("#guesses");
  guessesDiv.innerHTML = "";

  for (var i = 0; i < ATTEMPTS; i += 1) {
    var guessDiv = document.createElement("div");
    guessDiv.classList.add("guess");
    guessesDiv.appendChild(guessDiv);
  
    var result;
    if (i < guesses.length) {
      guessDiv.classList.add("guessed");
      result = checkWord(correctWord, guesses[i]);
    }
  
    for (var j = 0; j < LENGTH; j += 1) {
      var letterDiv = document.createElement("div");
      letterDiv.classList.add("letter");
      if (i < guesses.length) {
        letterDiv.innerHTML = guesses[i][j];

        if (result[j] == 1) {
          letterDiv.classList.add("match");
        } else if (result[j] == 2) {
          letterDiv.classList.add("contains");
        }
      }
      if (i == guesses.length && j < currentGuess.length) {
        // show the current guess in the last row
        letterDiv.innerHTML = currentGuess[j];
      }
      guessDiv.appendChild(letterDiv);
    }
  }
}

function submitGuess() {
  var messageDiv = document.querySelector("#message");

  if (currentGuess.length != 5) {
    messageDiv.innerHTML = "Bruh. 5 letters, please.";
  } else if (!allowed.includes(currentGuess)) {
    messageDiv.innerHTML = "Not a real word. Try again.";
  } else {
    if (guesses.length < 6) {
      guesses.push(currentGuess);
      messageDiv.innerHTML = "";
      if (currentGuess == correctWord) {
        messageDiv.innerHTML = "You win!";
        gameOver = true;
      } else if (guesses.length == 6) {
        messageDiv.innerHTML = "You lose!";
        gameOver = true;
      }
    }

    updateGuesses();
  }
}

function setupInputs() {
  document.onkeydown = function (event) {
    if (!gameOver && !event.altKey && !event.ctrlKey && !event.metaKey) {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        if (currentGuess.length < 5) {
          currentGuess += event.key.toLowerCase();
        }
      } else if (event.keyCode == 8) {
        currentGuess = currentGuess.slice(0, -1);
      } else if (event.keyCode == 13) {
        submitGuess();
        currentGuess = "";
      }
    }
    updateGuesses();
  };
}

fetchWordList();
setupInputs();
updateGuesses();
