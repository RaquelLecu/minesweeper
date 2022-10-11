let heightMinefieldData;
let widthMinefieldData;
let numMinesData;
let cellsMinefieldData;
let isGameOverData;

function getMinefieldData(height,width,mines){
    heightMinefieldData = height;
    widthMinefieldData = width;
    numMinesData = mines;
    isGameOverData = false;
    getCellsMinefieldData();
}

function getCellsMinefieldData(){
    cellsMinefieldData = new Array(heightMinefieldData);
    for(let i=0; i<heightMinefieldData; i++){
        cellsMinefieldData[i] = new Array(widthMinefieldData);
    }
    for(let y=0; y<heightMinefieldData; y++){
        for(let x=0; x<widthMinefieldData; x++){
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

function setStatusData(height,width){
    let cell = cellsMinefieldData[height][width];
    cell['status'] = 'exposed';
    cellsMinefieldData[height][width] = cell;
    if(cellsMinefieldData[height][width]['value'] == 'mine') lostGameData();
    if(cellsMinefieldData[height][width]['value'] == 'blank') setStatusNeighbor(height,width);
    return cell;
}

function setNumMineData(numToAdd){
    numMinesData = numMinesData + numToAdd;
}

function getMinesValueData(){
    for(let r=0; r<numMinesData; r++){
        let y = Math.floor(Math.random() * heightMinefieldData);
        let x = Math.floor(Math.random() * widthMinefieldData);
        if(cellsMinefieldData[y][x]["value"] == "blank")
            cellsMinefieldData[y][x]["value"] = "mine";
        else r--;
    }
}

function getMockMinesData(){
    if(heightMinefieldData == 1){
        setValueData(0,0,"mine");
    }else if(heightMinefieldData == 3){
        setValueData(0,0,"mine");
        setValueData(2,1,"mine");
        setValueData(2,2,"mine");
    }else if(heightMinefieldData == 4){
        setValueData(1,0,"mine");
        setValueData(3,2,"mine");
    }else if(heightMinefieldData == 8){
        getMinesValueData();
        for(let y=0; y<heightMinefieldData;y++){
            for(let x=0; x<widthMinefieldData;x++){
                setStatusData(y,x);
            }
        }
    }
}

function lostGameData(){
    for(let i=0; i<heightMinefieldData;i++){
        for(let j=0; j<widthMinefieldData;j++){
            if(cellsMinefieldData[i][j]['value'] == 'mine'){
                cellsMinefieldData[i][j]['status'] = 'exposed';
            }
        }
    }
    isGameOverData = true;
}

function getNumberValueData(){
    for(let i=0; i<heightMinefieldData;i++){
        for(let j=0; j<widthMinefieldData;j++){
            let mine = 0;
            if(cellsMinefieldData[i][j]['value'] == 'blank'){
                mine = mine + getNumMinesFileAround(i,j);
                if(i>0){
                    mine = mine + getNumMinesFileAround((i-1),j);
                } 
                if(i<(heightMinefieldData-1)){
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
    if(column<(widthMinefieldData-1) && cellsMinefieldData[file][column+1]['value'] == 'mine') mine++;
    return mine;
}

function setStatusNeighbor(height,width){
    setStatusFilerAround(height, width)    
    if(height>0) setStatusFilerAround((height-1), width); 
    if(height<(heightMinefieldData-1)) setStatusFilerAround((height+1), width);
}

function setStatusFilerAround(file, column){
    if(column>0 && cellsMinefieldData[(file)][column-1]['status'] == 'hidden') 
        setStatusData(file,(column-1));
    if(cellsMinefieldData[(file)][column]['status'] == 'hidden') 
        setStatusData(file,column);
    if(column<(widthMinefieldData-1) && cellsMinefieldData[file][column+1]['status'] == 'hidden') 
        setStatusData(file,(column+1));
}

function isWinData(){
    for(let i=0; i<heightMinefieldData;i++){
        for(let j=0; j<widthMinefieldData;j++){
            if(cellsMinefieldData[i][j]['value'] != 'mine' && cellsMinefieldData[i][j]['status'] == 'hidden'){
                return false;
            }
        }
    }
    return true;
}

function winGameData(){
    for(let i=0; i<heightMinefieldData;i++){
        for(let j=0; j<widthMinefieldData;j++){
            if(cellsMinefieldData[i][j]['value'] == 'mine'){
                cellsMinefieldData[i][j]['tag'] == 'flag';
            }
        }
    }
    isGameOverData = true;
    numMinesData = 0;
}