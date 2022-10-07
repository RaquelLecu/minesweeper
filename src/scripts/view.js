function getParametersUrlView(){
    let parametersData;
    const URL = document.location.href;
    if(URL.indexOf('?')>0){
        parametersData = [];
        let parametersUrl = URL.split('?')[1];
        let parameters = parametersUrl.split('&');
        let parameterSize = parameters[0].split('=')[1];        
        let file = parameterSize.split('x')[0];
        let column = parameterSize.split('x')[1];
        let parameterStatus;
        parametersData.push(file, column);
        if(parameters.length > 1){ 
            parameterStatus = parameters[1].split('=')[1];
            parametersData.push(parameterStatus);
        }
    }
    return parametersData;
}

function getMinefieldView(file, column){
    getMinefieldFileView(file);
    getMinefieldColumnView(column);
}

function getMinefieldFileView(file){
    const TABLE = document.querySelector('table');
    TABLE.innerHTML = "";
    
    for(file; file>0; file--){
        let row = document.createElement('tr');
        row.classList.add("row"+file);
        TABLE.appendChild(row);
    }
}

function getMinefieldColumnView(column){
    const ELEMENTS_FILE = document.querySelectorAll('tr');
    
    for(let i=0; i<ELEMENTS_FILE.length; i++){
        for(let j=0; j<column; j++){
            let cell = document.createElement('td');
            cell.classList.add("hidden");
            cell.setAttribute("id", (i+"-"+j));
            cell.setAttribute("data-testid", ((i+1)+"-"+(j+1)));
            ELEMENTS_FILE[i].appendChild(cell);
        }
    }
}

function setDisplayMinesView(mines){
    const DISPLAY_MINES = document.querySelector('#mines');
    DISPLAY_MINES.innerHTML = mines;
}

function setTagView(cell,tag){
    if(tag == "blank") cell.innerHTML = '';
    else if(tag == "flag") cell.innerHTML = '&#128681;';
    else if(tag == "question") cell.innerHTML = '&#10067;';
}

function setStatusView(cell, cellData){
    cell.setAttribute('class',cellData['status']);
    if(cellData['value'] == 'blank') setStatusNeighborView(cellsMinefieldData);
    else setValueView(cell, cellData);
}

function setValueView(cell, cellData){
    if(cellData['value'] == 'mine') lostGameView(cellsMinefieldData);
    else if(cellData['value'] != 'blank') cell.innerHTML = cellData['value'];
    else if(cellData['value'] == 'blank') cell.innerHTML = '';
}

function lostGameView(minefieldData){
    showAllMines(minefieldData);
}

function showAllMines(minefieldData){
    console.log(minefieldData)
    let allCell = document.querySelectorAll('td');
    const W = widthMinefieldData;
    for(let i=0; i<minefieldData.length;i++){
        for(let j=0; j<minefieldData[i].length;j++){
            if(minefieldData[i][j]['value'] == 'mine'){
                console.log(allCell[W*i+j]);
                allCell[W*i+j].setAttribute('class',minefieldData[i][j]['status']);
                allCell[W*i+j].innerHTML = '&#10040;';
                allCell[W*i+j].style.backgroundColor = "red";
            }
        }
    }
}

function setStatusNeighborView(minefieldData){
    let allCell = document.querySelectorAll('td');
    const W = widthMinefieldData;
    for(let i=0; i<minefieldData.length;i++){
        for(let j=0; j<minefieldData[i].length;j++){
            if(minefieldData[i][j]['status'] == 'exposed'){
                console.log(allCell[W*i+j]);
                allCell[W*i+j].setAttribute('class',minefieldData[i][j]['status']);
                setValueView(allCell[W*i+j],minefieldData[i][j]);
            }
        }
    }

}