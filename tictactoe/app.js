var playerTurn = 0;
var gameOver = false;
var allTiles = document.querySelectorAll(".tile");
var turnSpan = document.querySelector("#turn");
var winnerDiv = document.querySelector("#winner");

function checkWinner(player) {
  var sets = ["row1", "row2", "row3", "col1", "col2", "col3", "diag1", "diag2"];

  var winner = false;

  sets.forEach(function (set) {
    var selector = "." + set + "." + player;
    var tiles = document.querySelectorAll(selector);
    //console.log("selector:", selector, "count:", tiles.length);
    if (tiles.length == 3) {
      winner = true;
    }
  });

  return winner;
}

allTiles.forEach(function (tile) {
  tile.onclick = function () {
    if (tile.innerHTML == "" && !gameOver) {
      if (playerTurn == 0) {
        tile.innerHTML = "X";
        tile.classList.add("x");
        if (checkWinner("x")) {
          console.log("X WINS");
          winnerDiv.innerHTML = "X WINS!";
          winnerDiv.classList.add("x");
          gameOver = true;
        }
        playerTurn = 1;
        turnSpan.innerHTML = "O";
      } else {
        tile.innerHTML = "O";
        tile.classList.add("o");
        if (checkWinner("o")) {
          console.log("O WINS");
          winnerDiv.innerHTML = "O WINS!";
          winnerDiv.classList.add("o");
          gameOver = true;
        }
        playerTurn = 0;
        turnSpan.innerHTML = "X";
      }
    }
  };
});

