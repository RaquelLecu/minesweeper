launchInit();

function launchInit(){
    const PARAMETERS = getParametersUrlView();
    getMinefield(PARAMETERS);
    const CELLS = document.querySelectorAll('td');
    const faceButton = document.querySelector('#face');

    CELLS.forEach(cell => cell.addEventListener('contextmenu', event => {
        event.preventDefault();
        if(!isGameOverData){
            setTag(event.target);
        }
    },true));
    
    CELLS.forEach(cell => cell.addEventListener('click', event => {
        if(!isGameOverData){
            setStatus(event.target);
        }
    }));
    
    faceButton.addEventListener('click', resetGame);
}

function getMinefield(PARAMETERS){
    if(PARAMETERS === undefined){
        getMinefieldData(8,8,10);
        getMinesValueData();
        getNumberValueData();
        getMinefieldView(8,8);
    }else{
        let files = parseInt(PARAMETERS[0]);
        let columns = parseInt(PARAMETERS[1]);
        if(files == 1) getMockDemo(files,columns,1);
        else if(files == 3) getMockDemo(files,columns,3);
        else if(files == 4) getMockDemo(files,columns,2);
        else if(files == 8) getMockDemo(files,columns,10);
        else alert("ups... algo salió mal :("); 
    }
}

function getMockDemo(file,column,mine){
    getMinefieldData(file,column,mine);
    getMockMinesData();
    getNumberValueData();
    getMinefieldView(file, column);
    setDisplayMinesView(mine);
}

function setTag(cell){
    let coordinateCell = getCoordinateCell(cell);
    let oldTag = cell.innerText;
    let newTag;
    let cellData;

    if (oldTag == ""){
        setNumMineData(-1);
        newTag = 'flag';
    }else if(oldTag == "\u{1F6A9}"){
        setNumMineData(1);
        newTag = "question"
    }else if(oldTag == "\u{2753}") newTag = "blank";
    cellData = setTagData(coordinateCell[0], coordinateCell[1], newTag);
    if(cellData['status'] == 'hidden'){
        setTagView(cell, cellData['tag']);
        setDisplayMinesView(numMinesData);
    }
}

function getCoordinateCell(cell){
    let idCell = cell.getAttribute("id");
    let height = parseInt(idCell.split("-")[0]);
    let width = parseInt(idCell.split("-")[1]);
    let coordinate = [height, width];
    return coordinate;
}

function setStatus(cell){
    let cellData;
    let coordinateCell = getCoordinateCell(cell);
    cellData = setStatusData(coordinateCell[0],coordinateCell[1]);
    setStatusView(cell, cellData);
    let isWin = isWinData();
    if(isWin){
        winGameData();
        winGameView(cellsMinefieldData);    
    }
}

function resetGame(){
    const faceButton = document.querySelector('#face');
    const timeButton = document.querySelector('#time');
    const mineButton = document.querySelector('#mines');
    
    launchInit();
    faceButton.innerHTML = '&#128578;';
    timeButton.innerHTML = 0;
    mineButton.innerHTML = numMinesData;
}