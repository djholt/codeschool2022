var ATTEMPTS = 6;
var LENGTH = 5;

var correctWord = "flood";
//var guesses = ["early", "rodeo", "adder", "added", "world", "flood"];
var guesses = [];

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
      guessDiv.appendChild(letterDiv);
    }
  }
}

function setupInputs() {
  var guessInput = document.querySelector("#guess-input");
  var guessButton = document.querySelector("#guess-button");
  var messageDiv = document.querySelector("#message");
  guessButton.onclick = function () {
    var guess = guessInput.value;
  
    if (guess.length == 5) {
      guesses.push(guess);
      console.log("guesses:", guesses);
      guessInput.value = "";
      messageDiv.innerHTML = "";
      updateGuesses();
    } else {
      messageDiv.innerHTML = "Bruh. This is Wordzle. 5 letters, please.";
    }
  };
}

setupInputs();
updateGuesses();
