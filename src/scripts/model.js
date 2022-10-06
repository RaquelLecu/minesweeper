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
    return cell;
}

function setValueData(height,width,value){
    let cell = cellsMinefieldData[height][width];
    cell['value'] = value;
    cellsMinefieldData[height][width] = cell;
    return cell;
}

function setStatusData(height,width,status){
    let cell = cellsMinefieldData[height][width];
    cell['status'] = status;
    cellsMinefieldData[height][width] = cell;
    if(cellsMinefieldData[height][width]['value'] == 'mine') lostGameData();
    return cell;
}

function setNumMineData(numToAdd){
    numMinesData = numMinesData + numToAdd;
}

function getMinesValueData(){
    for(let r=0; r<numMinesData; r++){
        let y = Math.floor(Math.random() * heightMinefield);
        let x = Math.floor(Math.random() * widthMinefield);
        if(cellsMinefieldData[y][x]["value"] == "blank")
            cellsMinefieldData[y][x]["value"] = "mine";
        else r--;
    }
}

function getMockMinesData(){
    if(heightMinefield == 1){
        setValueData(0,0,"mine");
    }else if(heightMinefield == 3){
        setValueData(0,0,"mine");
        setValueData(2,1,"mine");
        setValueData(2,2,"mine");
    }else if(heightMinefield == 4){
        setValueData(1,0,"mine");
        setValueData(3,2,"mine");
    }else if(heightMinefield == 8){
        setRandomValue();
        for(let y=0; y<heightMinefield;y++){
            for(let x=0; x<widthMinefield;x++){
                setStatusData(y,x,'exposed');
            }
        }
    }
}

function lostGameData(){
    for(let i=0; i<heightMinefield;i++){
        for(let j=0; j<widthMinefield;j++){
            if(cellsMinefieldData[i][j]['value'] == 'mine'){
                cellsMinefieldData[i][j]['status'] = 'exposed';
            }
        }
    }
}

function getNumberValueData(){
    for(let i=0; i<heightMinefield;i++){
        for(let j=0; j<widthMinefield;j++){
            let mine = 0;
            if(cellsMinefieldData[i][j]['value'] == 'blank'){
                mine = mine + getNumMinesFileAround(i,j);
                if(i>0){
                    mine = mine + getNumMinesFileAround((i-1),j);
                } 
                if(i<(heightMinefield-1)){
                    mine = mine + getNumMinesFileAround((i+1),j)
                }
            }
            if(mine>0) cellsMinefieldData[i][j]['value'] = mine;
        }
    }
}

function getNumMinesFileAround(file,column){
    let mine = 0;
    if(column>0 && cellsMinefieldData[(file)][column-1]['value'] == 'mine') mine++;
    if(cellsMinefieldData[(file)][column]['value'] == 'mine') mine++;
    if(column<(widthMinefield-1) && cellsMinefieldData[file][column+1]['value'] == 'mine') mine++;
    return mine;
}