var userNumberOfRows, userNumberOfColumns;
function startGame(numberOfRows,numberOfColumns) {
    document.getElementById('game').style.display = 'block';
    document.getElementById('homePage').style.display = 'none';
    type = userType;
    if(type === "playerComputer" ){
        modeUser = document.getElementById("difficulty-level").value;
        mode = modeUser;
        document.getElementById("rowInput").value = "";
        document.getElementById("columnInput").value = "";
        document.getElementById("list-type-play").value = "2Players";
        document.getElementById('difficulty').style.display = "none";
        document.getElementById('')
        init(numberOfRows, numberOfColumns);
    }
    else {
    document.getElementById("columnInput").value = "";
        document.getElementById("rowInput").value = "";
        init(numberOfRows, numberOfColumns);
    }
}
function handleClick(){
    let isLoad = true;

    if (!userNumberOfRows) {
        document.getElementById("rowError").textContent = "* Please fill in this field.";
        isLoad = false;
    } 

    if (!userNumberOfColumns) {
        document.getElementById("columnError").textContent = "* Please fill in this field.";
        isLoad = false;
    } 
    if (isNaN(userNumberOfRows)) {
        document.getElementById("rowError").textContent = "* Please enter a valid number";
        document.getElementById("rowInput").value = "";
        isLoad = false;
    }
    if (isNaN(userNumberOfColumns)){
        document.getElementById("columnError").textContent = "* Please enter a valid number";
        document.getElementById("columnInput").value = "";
        isLoad = false;
    }
    if(isLoad){
        numberOfRows = userNumberOfRows;
        numberOfColumns = userNumberOfColumns;
        startGame(numberOfRows,numberOfColumns) ;
    }
    else{
        return;
    }
}
document.getElementById("create").addEventListener('click', getValue);
function handleKeyDown(event){
    if (event.key === 'Enter') {
        getValue();
    }
}
function getValue(){
    userNumberOfRows = document.getElementById("rowInput").value;
    userNumberOfColumns = document.getElementById("columnInput").value;
    userType = document.getElementById("list-type-play").value;
    handleClick();
}
document.getElementById("container").addEventListener('keydown', handleKeyDown);
document.getElementById("columnInput").addEventListener('keydown', handleKeyDown);



