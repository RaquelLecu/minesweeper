const PARAMETERS = getParametersUrlView();

getMinefield();

function getMinefield(){
    if(PARAMETERS === undefined) getMinefieldData(8,8,10);
    else{
        let files = parseInt(PARAMETERS[0]);
        let columns = parseInt(PARAMETERS[1])
        if(files == 1) getMockDemo(files,columns,1);
        else if(files == 3) getMockDemo(files,columns,3);
        else if(files == 4) getMockDemo(files,columns,2);
        else if(files == 8) getMockDemo(files,columns,10);
        else alert("ups... algo salió mal :(");    
    }
}

function getMockDemo(file,column,mine){
    getMinefieldData(file,column,mine);
    getMinefieldFileView(file);
    getMinefieldColumnView(column);
    setDisplayMinesView(mine);
}