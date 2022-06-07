var submitButton = document.querySelector("#submit-button");
console.log("submit button:", submitButton);

function newProblem() {
  var op = Math.floor(Math.random() * 2);
  var a = Math.floor(Math.random() * 20);
  var b = Math.floor(Math.random() * 20);
  var spanA = document.querySelector("#number-a");
  var spanB = document.querySelector("#number-b");
  var spanOp = document.querySelector("#op");
  spanA.innerHTML = a;
  spanB.innerHTML = b;
  if (op == 1) {
    spanOp.innerHTML = '+';
    return a + b;
  } else {
    spanOp.innerHTML = 'x';
    return a * b;
  }
}

var correctAnswer = newProblem();

submitButton.onclick = function () {
  // code goes here, runs each time the button is clicked

  var answerInput = document.querySelector("#answer-input");
  var answerFeedback = document.querySelector("#answer-feedback");

  if (answerInput.value == correctAnswer) {
    console.log("correct!");
    answerFeedback.innerHTML = "Correct!";
    answerFeedback.style.backgroundColor = "#00CC00";
    //answerFeedback.classList.add("correct");
    correctAnswer = newProblem();
  } else {
    console.log("incorrect.");
    answerFeedback.innerHTML = "Incorrect. Try again.";
    answerFeedback.style.backgroundColor = "#CC0000";
  }

  answerInput.value = "";
};
