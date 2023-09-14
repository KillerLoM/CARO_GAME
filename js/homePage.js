

function startGame(numberOfRows,numberOfColumns) {

    var type = document.getElementById("list-type-play").value;
    var mode = document.getElementById("difficulty-level").value;
    console.log(mode);
    if(type === "playerComputer" ){
        document.getElementById("rowInput").value = "";
        document.getElementById("columnInput").value = "";
        document.getElementById("list-type-play").value = "2Players";
        document.getElementById('difficulty').style.display = "none";
        window.location.href = "/game.html?rows="+numberOfRows+"&columns="+numberOfColumns+"&type="+type+"&mode="+mode;
    }
    else {
        document.getElementById("rowInput").value = "";
        document.getElementById("columnInput").value = "";
        window.location.href = "/game.html?rows="+numberOfRows+"&columns="+numberOfColumns+"&type="+type;
    }
    
}
function handleClick(){
    let isLoad = true;
    var numberOfRows = document.getElementById("rowInput").value;
    var numberOfColumns = document.getElementById("columnInput").value;
    if (!numberOfRows) {
        document.getElementById("rowError").textContent = "* Please fill in this field.";
        isLoad = false;
    } 

    if (!numberOfColumns) {
        document.getElementById("columnError").textContent = "* Please fill in this field.";
        isLoad = false;
    } 
    if (isNaN(numberOfRows)) {
        document.getElementById("rowError").textContent = "* Please enter a valid number";
        document.getElementById("rowInput").value = "";
        isLoad = false;
    }
    if (isNaN(numberOfColumns)){
        document.getElementById("columnError").textContent = "* Please enter a valid number";
        document.getElementById("columnInput").value = "";
        isLoad = false;
    }
    if(isLoad){

        startGame(numberOfRows,numberOfColumns) ;
    }
    else{
        return;
    }

}
document.getElementById("create").addEventListener('click', handleClick);
function handleKeyDown(event){
    // Check if the event was a keydown event
    if (event.key === 'Enter') {
        handleClick();
    }
}

document.getElementById("container").addEventListener('keydown', handleKeyDown);
document.getElementById("columnInput").addEventListener('keydown', handleKeyDown);



