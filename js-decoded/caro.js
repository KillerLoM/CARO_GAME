let matrixGame = [];
let numberOfRows;
let numberOfColumns;
let player = "X";
let type = "";
let newId = "";
let col = 0;
let row = 0;
let mode = "";
let phase = 0;
let counter = 0;
let advancedPoint = 0;
let advancedPointBot = 0;
let SCORE_BOT = new Map([

]);
let SCORE_USER = new Map([

]);
function renderTable(columns, rows) {
  let resume = "<table cellpadding='0' cellspacing='0'>";
  for (let col = 0; col < columns; col++) {
    let arr = [];
    resume += "<tr>";
    for (let row = 0; row < rows; row++) {
      arr.push("");
      resume += "<td>";
      resume += "<button  title='Columns = " + col + "\nRow = " + row + "' id='btn" + col + "_" + row + "' onclick='handlePlay(this.id)'></button>";
      resume += "</td>";
    }
    resume += "</tr>";
    matrixGame.push(arr);
  }
  resume += "</table>";
  numberOfColumns = columns;
  numberOfRows = rows;
  return resume;
}
function init(numberOfColumns, numberOfRows) {
  player = "X";
  counter = 0;
  // const urlParams = new URLSearchParams(window.location.search);
  // let rows = urlParams.get("rows");
  // let columns = urlParams.get("columns");
  phase = 1;
  // type = urlParams.get("type");
  var chatbox = document.getElementById("chatbox");
  chatbox.innerHTML = "";
  chatbox.innerHTML += "<h1>" + "GAME STARTED" + "</h1>";
  chatbox.innerHTML += "<hr/>";
  chatbox.innerHTML += "<p> Phase " + phase + "</p>";

  document.getElementById("output").innerHTML = renderTable(numberOfColumns, numberOfRows);
}
function chatBox(col, row, player) {
  var chatbox = document.getElementById("chatbox");
  if (counter == 2) {
    phase++;
    counter = 0;
    chatbox.innerHTML += "<hr/>";
    chatbox.innerHTML += "<p> Phase " + phase + "</p>";
  }
  if (type === "2Players") {
    counter++;
    chatbox.innerHTML += "<p>  " + " Player(" + player + ")  " + "Col = " + col + "; Row = " + row + "</p>";
  }

  if (type === "playerComputer") {
    counter++;
    if (player === "X") {
      chatbox.innerHTML += "<p>  " + " Player(" + player + ")  " + "Col = " + col + "; Row = " + row + "</p>";
    }
    else {
      chatbox.innerHTML += "<p>  " + " Bot(" + player + ")  " + "Col = " + col + "; Row = " + row + "</p>";
    }
  }
}
function handlePlay(id) {
  let points = id.split("_");
  col = Number(points[0].split("btn")[1]);
  row = Number(points[1]);
  switch (playGame(id, col, row,type)) {
    case "WIN":
      alert(player + " has won!");
      matrixGame = [];
      init(numberOfColumns, numberOfRows);
      break;
    case "LOSE":
      alert("You lose!");
      matrixGame = [];
      init(numberOfColumns, numberOfRows);
      break;
    case "DRAW":
      alert("game draw!");
      matrixGame = [];
      init(numberOfColumns, numberOfRows);
      break;
  }
}
function playGame(id, col, row, type) {
  if (player === "X") {
    var button = document.getElementById(id);
    if (button.innerHTML !== "X") {
      button.innerHTML = player;
      button.disabled = true;
      button.style.backgroundColor = "white";
    }
    matrixGame[col][row] = player;
    chatBox(col, row, player);
  }

  if (type === "playerComputer") {
    if(checkWin(col, row, player)){
      alert("You win!");
      matrixGame = [];
      init(numberOfColumns, numberOfRows);
      return;
    }
    else if(!checkWin(col, row, player)){
      player = player === "X" ? "O" : "X";
      let pointsOfBot = handleBot();
      col = pointsOfBot[0];
      row = pointsOfBot[1];
      id = "btn" + col.toString() + "_" + row.toString();
    }
  }
  if(type === "2Players"){
    if(checkWin(col, row, player)){
      return "WIN";
    }
  }
  if (player === "O") {
    var button = document.getElementById(id);
    if (button.innerHTML !== player) {
      button.innerHTML = player;
      button.disabled = true;
      button.style.backgroundColor = "white";
    }
    matrixGame[col][row] = player;
    chatBox(col, row, player);
  }
  if(type === "2Players"){
    if(checkWin(col, row, player)){
      return "WIN";
    }
  }
  else if (type !== "2Players"){
    if(checkWin(col, row, player)){
      return "LOSE";
    }
  }
  player = player === "X" ? "O" : "X";
  if (checkDraw()) {
    return "DRAW";
  }
}

function getNumberOfHorizontal(x, y, player) {
  let count = 1;
  for (let i = 1; i < 5; i++) {
    if (y + i < matrixGame[1].length && matrixGame[x][y + i] === player) {
      count++;
    } else {
      break;
    }
  }
  for (let i = 1; i < 5; i++) {
    if (
      y - i >= 0 &&
      matrixGame[x][y - i] === player
    ) {
      count++;
    } else {
      break;
    }
  }
  return count;
}
function getNumberOfVertical(x, y, player) {
  let count = 1;
  for (let i = 1; i < 5; i++) {
    if (x + i < matrixGame[0].length && matrixGame[x + i][y] === player) {
      count++;
    } else {
      break;
    }
  }
  for (let i = 1; i < 5; i++) {
    if (
      x - i >= 0 &&
      matrixGame[x - i][y] === player
    ) {
      count++;
    } else {
      break;
    }
  }

  return count;
}
function getNumberOfRightDiagonal(x, y, player) {
  let count = 1;
  for (let i = 1; i < 5; i++) {
    if (
      x - i >= 0 &&
      y + i < matrixGame[1].length &&
      matrixGame[x - i][y + i] === player
    ) {
      count++;
    } else {
      break;
    }
  }

  for (let i = 1; i < 5; i++) {
    if (
      x + i < matrixGame[0].length &&
      y - i >= 0 &&
      matrixGame[x + i][y - i] === player
    ) {
      count++;
    } else {
      break;
    }
  }

  return count;
}

function getNumberOfLeftDiagonal(x, y, player) {
  let count = 1;
  for (let i = 1; i < 5; i++) {
    if (
      x - i >= 0 &&
      y - i >= 0 &&
      y - i < matrixGame[1].length &&
      x - i < matrixGame[0].length &&
      matrixGame[x - i][y - i] === player
    ) {
      count++;
    } else {
      break;
    }
  }

  for (let i = 1; i < 5; i++) {
    if (
      x + i < matrixGame[0].length &&
      y + i < matrixGame[1].length &&
      matrixGame[x + i][y + i] === player
    ) {
      count++;
    } else {
      break;
    }
  }

  return count;
}
function checkWin(col, row, player) {
  return (
    getNumberOfHorizontal(col, row, player) == 5 ||
    getNumberOfVertical(col, row, player) == 5 ||
    getNumberOfLeftDiagonal(col, row, player) == 5 ||
    getNumberOfRightDiagonal(col, row, player) == 5
  );
}
function checkDraw() {
  for (let i = 0; i < matrixGame[0].length; i++) {
    for (let j = 0; j < matrixGame[1].length; j++) {
      if (matrixGame[i][j] === "") {
        return false;
      }
    }
  }
  return true;
}
function setModeBot() {
  if (mode === "hard") {
    SCORE_BOT = MAP_SCORE_BOT_HARD;
    SCORE_USER = MAP_SCORE_USER_HARD;
    advancedPoint = -1;
    advancedPointBot = 0;
  }
  else if (mode === "easy") {
    SCORE_BOT = MAP_SCORE_BOT_EASY;
    SCORE_USER = MAP_SCORE_USER_EASY;
    advancedPoint = -1;
    advancedPointBot = 0;
  }
  else if (mode === "medium") {
    SCORE_BOT = MAP_SCORE_BOT_MEDIUM;
    SCORE_USER = MAP_SCORE_USER_MEDIUM;
    advancedPoint = -1;
    advancedPointBot = 1;
  }
}

function handleBot() {
  setModeBot()
  let maxScore = 0;
  let pointsComputer = [];
  let listScorePoint = [];
  for (let i = 0; i < matrixGame[0].length; i++) {
    for (let j = 0; j < matrixGame[1].length; j++) {
      if (matrixGame[i][j] === "") {
        let score =
          SCORE_BOT.get(
            Math.max(
              getNumberOfHorizontal(i, j, "O"),
              getNumberOfVertical(i, j, "O"),
              getNumberOfRightDiagonal(i, j, "O"),
              getNumberOfLeftDiagonal(i, j, "O")
            )
          ) + advancedPointBot +
          SCORE_USER.get(
            Math.max(
              getNumberOfHorizontal(i, j, "X"),
              getNumberOfVertical(i, j, "X"),
              getNumberOfRightDiagonal(i, j, "X"),
              getNumberOfLeftDiagonal(i, j, "X")
            ) + advancedPoint
          );
        if (maxScore < score) {
          maxScore = score;
          listScorePoint.push({
            score: score,
            point: [i, j],
          });
        }
      }
    }
  }
  for (const element of listScorePoint) {
    if (element.score === maxScore) {
      pointsComputer.push(element.point);
    }
  }
  return pointsComputer[Math.floor(Math.random() * pointsComputer.length)];
}
init(numberOfColumns, numberOfRows)