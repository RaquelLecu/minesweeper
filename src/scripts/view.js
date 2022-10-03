function getParametersUrlView(){
    let parametersData = [];
    const URL = document.location.href;
    if(URL.indexOf('?')>0){
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
        return parametersData;
    }
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
        row.classList.add("row");
        TABLE.appendChild(row);
    }
}

function getMinefieldColumnView(column){
    const ELEMENTSFILE = document.querySelectorAll('tr');
    
    for(let i=0; i<ELEMENTSFILE.length; i++){
        for(let j=0; j<column; j++){
            let cell = document.createElement('td');
            cell.classList.add("hidden");
            cell.setAttribute("id", (i+"-"+j));
            cell.setAttribute("data-testid", ((i+1)+"-"+(j+1)));
            ELEMENTSFILE[i].appendChild(cell);
        }
    }
}

function setDisplayMinesView(mines){
    const DISPLAYMINES = document.querySelector('#mines');
    DISPLAYMINES.innerHTML = mines;
}

function setTagView(cell,tag){
    if(tag == "blank") cell.innerHTML = '';
    else if(tag == "flag") cell.innerHTML = '&#128681;';
    else if(tag == "question") cell.innerHTML = '&#10067;';
}