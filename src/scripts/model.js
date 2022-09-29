let heightMinefield;
let widthMinefield;
let numMines;
let cellsMinefield;

function getMinefieldData(height,width,mines){
    heightMinefield = height;
    widthMinefield = width;
    numMines = mines;
    getCellsMinefieldData();
}

function getCellsMinefieldData(){
    let cellsMinefield = new Array(heightMinefield);
    for(let i=0; i<heightMinefield; i++){
        cellsMinefield[i] = new Array(widthMinefield);
    }
    for(let y=0; y<heightMinefield; y++){
        for(let x=0; x<widthMinefield; x++){
            let cellDefault = {"value":"blank","status":"hidden","tag":"blank"};
            cellsMinefield[y][x] = cellDefault;
        }
    }
}