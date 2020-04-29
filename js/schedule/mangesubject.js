function addSubject(){
    try{
        checkTimeSelect();
        checkScheduleAdd();
        checkSubjectSelected("subjectspopup");
        addInfoSchedule();
    }catch(error){
        $("#errordiv").empty();
        $("#errordiv").append('<div id = "errormessage" class = "inlineblocks">' +  error + '</div>');
        document.getElementById("errordiv").style.display = "block";
    }
}

function editSubject(){
    try{
        checkTimeSelect();
        checkScheduleEdit();
        deleteSubject();
        editInfoSchedule();
    }catch(error){
        console.log(error);5
        $("#errordiv").empty();
        $("#errordiv").append('<div id = "errormessage" class = "inlineblocks">' +  error + '</div>');
        document.getElementById("errordiv").style.display = "block";
    }
}

function manageSubject(selector){
    var complement = getComplement(selector);
    try{
        checkTimeSelect();
        checkSchedule(complement);
        if(selector){
            deleteSubject();
        }
        addSubject(complement);
        closeModalButtons("editionpopup");
    }catch(error){
        console.log(error);
        $("#errordiv" + complement).empty();
        $("#errordiv" + complement).append('<div id = "errormessage" class = "inlineblocks">' +  error + '</div>');
        document.getElementById("errordiv" + complement).style.display = "block";
    }
}

function getComplement(selector){
    if(selector){
        return "option";
    }
    return "";
}

function checkScheduleAdd(){
    for(var counter = 0;counter < selectweekelements.length; counter ++){
        var inittime = document.getElementsByClassName('morninglist')[counter].value;
        if(selectweekelements[counter] && document.getElementById('scheduletable').rows[timesmorning[inittime]].cells[counter].childElementCount == 1 /** && checkSameElement(timesmorning[inittime],counter) **/){
            throw "Horario invalido. Materias colicionando";
        }
    }
}

function checkScheduleEdit(){
    for(var counter = 0;counter < selectweekelements.length; counter ++){
        var inittime = document.getElementsByClassName('morninglist')[counter].value;
        if(selectweekelements[counter] && document.getElementById('scheduletable').rows[timesmorning[inittime]].cells[counter].childElementCount == 1){
            if(!checkSameElement(timesmorning[inittime],counter)){
                throw "Horario invalido. Materias colicionando";
            }
        }
    }
}

function checkSameElement(rownumber,cellnumber){
    return document.getElementById('scheduletable').rows[rownumber].cells[cellnumber].getElementsByClassName(popupoptionssubkeyselected).length == 1;
}

function checkTimeSelect(){
    if(JSON.stringify(selectweekelements) === '[false,false,false,false,false]'){
        throw "No se ha seleccionado ningun dia";
    }
}

function checkSubjectSelected(elementname){
    if(document.getElementById(elementname).value.split(',')[0] == ""){
        throw "Materia no seleccionada";
    }
}

function addInfoSchedule(){
    for(var counter = 0;counter < selectweekelements.length;counter ++){
        if(selectweekelements[counter]){
            var subject = {
                clave_aula:document.getElementsByClassName('classroomselect')[counter].value,
                clave_maestro:document.getElementById('teacherspopup').value.split(',')[0],
                clave_materia:document.getElementById('subjectspopup').value.split(',')[0],
                dia_semana:invertedweekdays[counter],
                hora_inicio:document.getElementsByClassName('morninglist')[counter].value,
                hora_termina:document.getElementsByClassName('finishhour')[counter].value,
                nombre_maestro:document.getElementById('teacherspopup').value.split(',')[1],
                nombre_materia:document.getElementById('subjectspopup').value.split(',')[1]
            }
            chargeSubjectsTable(subject);
            subjects_schedule.push(subject);
        }
    }
    $('#' + document.getElementById('subjectspopup').value.split(',')[0] + 'options').remove();
    $('#' + document.getElementById('teacherspopup').value.split(',')[0]).remove();
    closeAddScheduleButtons();
}

function editInfoSchedule(){
    console.log(popupoptionssubjectselected);
    console.log(popupoptionssubkeyselected);
    for(var counter = 0;counter < selectweekelements.length;counter ++){
        if(selectweekelements[counter]){
            var subject = {
                clave_aula:document.getElementsByClassName('classroomselectoption')[counter].value,
                clave_maestro:document.getElementById('teacherspopupoption').value.split(',')[0],
                clave_materia:popupoptionssubkeyselected,
                dia_semana:invertedweekdays[counter],
                hora_inicio:document.getElementsByClassName('morninglistoption')[counter].value,
                hora_termina:document.getElementsByClassName('finishhouroption')[counter].value,
                nombre_maestro:document.getElementById('teacherspopupoption').value.split(',')[1],
                nombre_materia:popupoptionssubjectselected
            }
            chargeSubjectsTable(subject);
            subjects_schedule.push(subject);
        }
    }
}

function deleteSubject(){
    $('.' + popupoptionssubkeyselected).remove();
    for(var counter = 0;counter < subjects_schedule.length;counter ++){
        if(popupoptionssubkeyselected === subjects_schedule[counter].clave_materia){
            subjects_schedule.splice(counter);
        }
    }
    console.log(subjects_schedule);
    subjectselect.append('<option id= "' + popupoptionssubkeyselected + 'options" value = "' + popupoptionssubkeyselected + ',' + popupoptionssubjectselected + '" >' + popupoptionssubjectselected + '</option>');
    closeModalButtons('optionspopup');
}