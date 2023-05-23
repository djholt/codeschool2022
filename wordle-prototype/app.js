let ATTEMPTS = 6;
let LENGTH = 5;
let correctWord = "flood";
//let guesses = ["early", "lints", "allow", "bloom", "floor", "flood"];
let guesses = ["early"];
let currentGuess = "";

let allowed = [];
let answers = [];

function fetchWords() {
  fetch("https://api.jsonbin.io/v3/b/629f9937402a5b38021f6b38").then(function (response) {
    response.json().then(function (data) {
      allowed = data.record.allowed.concat(data.record.answers);
      answers = data.record.answers;
    });
  });
}

function checkWord(correct, guess) {
  var letters = correct.split("");
  var result = letters.map(x => 0);
  for (let i = 0; i < LENGTH; i++) {
    if (guess[i] == letters[i]) {
      letters[i] = null;
      result[i] = 1;
    }
  }
  for (let i = 0; i < LENGTH; i++) {
    let index = letters.indexOf(guess[i]);
    if (index >= 0 && result[i] == 0) {
      letters[index] = null;
      result[i] = 2;
    }
  }
  return result;
}

function updateGuesses() {
  let guessesDiv = document.querySelector("#guesses");
  guessesDiv.innerHTML = "";

  for (let i = 0; i < ATTEMPTS; i++) {
    let guessDiv = document.createElement("div");
    guessDiv.classList.add("guess");

    let result;
    if (i < guesses.length) {
      guessDiv.classList.add("guessed");
      result = checkWord(correctWord, guesses[i]);
    }

    for (let j = 0; j < LENGTH; j++) {
      let letterDiv = document.createElement("div");
      letterDiv.classList.add("letter");
      guessDiv.appendChild(letterDiv);

      if (i < guesses.length) {
        let letter = guesses[i][j];
        letterDiv.innerHTML = letter;
        if (result[j] == 1) {
          letterDiv.classList.add("match");
        }
        if (result[j] == 2) {
          letterDiv.classList.add("contains");
        }
      }
    }
    guessesDiv.appendChild(guessDiv);
  }
}

function submitGuess(guess) {
  if (guess && allowed.includes(guess)) {
    guesses.push(guess);
    updateGuesses();
  } else {
    alert("Invalid guess.");
  }
}

let currentGuessDiv = document.querySelector("#current-guess");
document.onkeydown = function (event) {
  if (!event.altKey && !event.ctrlKey && !event.metaKey) {
    if (event.keyCode == 8) {
      currentGuess = currentGuess.slice(0, -1)
    } else if (event.keyCode == 13) {
      submitGuess(currentGuess);
      currentGuess = "";
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
      var key = event.key.toLowerCase();
      if (currentGuess.length < 5) {
        currentGuess += key;
      }
    }
    currentGuessDiv.innerHTML = currentGuess;
  }
};

fetchWords();
updateGuesses();
