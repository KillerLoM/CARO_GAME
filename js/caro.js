let matrixGame = [];
let player = "X";
let type = "";
let newId = "";
let col = 0;
let row = 0;
let mode = "";
let phase = 0;
let counter = 0;
let SCORE_BOT = new Map([
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
]);
let SCORE_USER = new Map([
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
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

  return resume;
}
function init() {
  player = "X";
  countVertical1 = 0;
  countHorizontal1 = 0;
  const urlParams = new URLSearchParams(window.location.search);
  let rows = urlParams.get("rows");
  let columns = urlParams.get("columns");
  phase = 1;
  type = urlParams.get("type");
  var chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += "<h1>" +  "GAME STARTED" + "</h1>";
    chatbox.innerHTML += "<hr/>";
    chatbox.innerHTML += "<p> Phase " + phase +  "</p>";
  if (type === "playerComputer") {
    mode = urlParams.get("mode");
    console.log(mode);
  }
  document.getElementById("output").innerHTML = renderTable(columns, rows);
}
function chatBox(col, row, player){
  var chatbox = document.getElementById("chatbox");
  counter ++;
  if(counter > 2 ){
      phase++;
      counter = 0;
      chatbox.innerHTML += "<hr/>";
      chatbox.innerHTML += "<p> Phase " + phase +  "</p>";
  }
  if (type === "2Players"){
    chatbox.innerHTML += "<p>  " + " Player(" + player + ")  " + "Col = " + col + "; Row = " + row + "</p>";
  }
  
  if(type === "playerComputer"){
    if (player === "X"){
      chatbox.innerHTML += "<p>  "  + " Player(" + player + ")  " + "Col = " + col + "; Row = " + row + "</p>";
    }
    else {
      chatbox.innerHTML += "<p>  "  + " Bot(" + player + ")  " + "Col = " + col + "; Row = " + row + "</p>";
    }
  }
  
}
function handlePlay(id) {
  let points = id.split("_");
  col = Number(points[0].split("btn")[1]);
  row = Number(points[1]);
  console.log(col + " " + row);
  if (type === "2Players") {
    switch (playGame2Players(id, col, row)) {
      case "WIN":
        alert(player + " has won!");
        matrixGame = [];
        init();
        break;
      case "DRAW":
        alert("game draw!");
        matrixGame = [];
        init();
        break;
    }
  }
  if (type === "playerComputer") {
    switch (playGameBot(id, col, row)) {
      case "WIN":
        alert("You win!");
        matrixGame = [];
        init();
        break;
      case "LOOSE":
        alert("You lose!");
        matrixGame = [];
        init();
        break;
      case "DRAW":
        alert("game draw!");
        matrixGame = [];
        init();
        break;
    }
  }
}
function playGame2Players(id, col, row) {
  if (player === "X") {
    var button = document.getElementById(id);
    if (button.innerHTML !== "X") {
      button.innerHTML = player;
      button.disabled = true;
      button.style.backgroundColor = "white";
    }
    matrixGame[col][row] = player;
    chatBox(col,row,player);
  }
  if (checkWin(col, row, player)) {
    return "WIN";
  }
  if (player === "O") {
    var button = document.getElementById(id);
    if (button.innerHTML !== player) {
      button.innerHTML = player;
      button.disabled = true;
      button.style.backgroundColor = "white";
    }
    matrixGame[col][row] = player;
    chatBox(col,row,player);
  }
  if (checkWin(col, row, player)) {
    return "WIN";
  }
  player = player === "X" ? "O" : "X";
  if (checkDraw()) {
    return "DRAW";
  }
}
function playGameBot(id, col, row) {

  if (player === "X") {
    var button = document.getElementById(id);
    if (button.innerHTML !== "X") {
      button.innerHTML = player;
      button.disabled = true;
      button.style.backgroundColor = "white";
    }
    matrixGame[col][row] = player;
    chatBox(col,row,player);
  }
  if (checkWin(col,row,  player)) {
    return "WIN";
  }
  player = player === "X" ? "O" : "X";
  let pointsOfBot = handleBot();
  console.log(pointsOfBot);
  if (player === "O") {
    row = pointsOfBot[1];
    col = pointsOfBot[0];
    newId = "btn" + col.toString() + "_" + row.toString();
    var button = document.getElementById(newId);
    if (button.innerHTML !== "O") {
      button.innerHTML = player;
      button.disabled = true;
      button.style.backgroundColor = "white";
    }
    matrixGame[col][row] = player;
    chatBox(col,row,player);
  }
  if (checkWin(col,row,  player)) {
    return "LOOSE";
  }
  player = player === "X" ? "O" : "X";
  if (checkDraw()) {
    return "DRAW";
  }
}
function getHorizontal(x, y, player) {
  let count = 1;
  for (let i = 1; i < 5; i++) {
    if (y + i < matrixGame.length && matrixGame[x][y + i] === player) {
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
function getVertical(x, y, player) {
  let count = 1;
  for (let i = 1; i < 5; i++) {
    if (x + i < matrixGame.length && matrixGame[x + i][y] === player) {
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
function getRightDiagonal(x, y, player) {
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

function getLeftDiagonal(x, y, player) {
  let count = 1;
  for (let i = 1; i < 5; i++) {
    if (
      x - i >= 0 &&
      y - i >= 0 &&
      y - i < matrixGame[1].length &&
      x - i <= matrixGame[0].length &&
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
    getHorizontal(col, row, player) == 5 ||
    getVertical(col, row, player) == 5 ||
    getLeftDiagonal(col, row, player) == 5 ||
    getRightDiagonal(col, row, player) == 5
  );
}
function checkDraw() {
  for (let i = 0; i < matrixGame.length; i++) {
    for (let j = 0; j < matrixGame[i].length; j++) {
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
  }
  else if (mode === "easy") {
    SCORE_BOT = MAP_SCORE_BOT_EASY;
    SCORE_USER = MAP_SCORE_USER_EASY;
  }
  else if (mode === "medium") {
    SCORE_BOT = MAP_SCORE_BOT_MEDIUM;
    SCORE_USER = MAP_SCORE_USER_MEDIUM;
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
              getHorizontal(i, j, "O"),
              getVertical(i, j, "O"),
              getRightDiagonal(i, j, "O"),
              getLeftDiagonal(i, j, "O")
            )
          ) +
          SCORE_USER.get(
            Math.max(
              getHorizontal(i, j, "X"),
              getVertical(i, j, "X"),
              getRightDiagonal(i, j, "X"),
              getLeftDiagonal(i, j, "X")
            ) - 1
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
init()