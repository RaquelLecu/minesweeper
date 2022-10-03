let heightMinefield;
let widthMinefield;
let numMinesData;
let cellsMinefieldData;

function getMinefieldData(height,width,mines){
    heightMinefield = height;
    widthMinefield = width;
    numMinesData = mines;
    getCellsMinefieldData();
}

function getCellsMinefieldData(){
    cellsMinefieldData = new Array(heightMinefield);
    for(let i=0; i<heightMinefield; i++){
        cellsMinefieldData[i] = new Array(widthMinefield);
    }
    for(let y=0; y<heightMinefield; y++){
        for(let x=0; x<widthMinefield; x++){
            let cell = {"value":"blank","status":"hidden","tag":"blank"};
            cellsMinefieldData[y][x] = cell;
        }
    }
}

function setTagData(height,width,tag){
    let cell = cellsMinefieldData[height][width];
    cell['tag'] = tag;
    cellsMinefieldData[height][width] = cell;
}

function setNumMineData(numToAdd){
    numMinesData = numMinesData + numToAdd;
}