function manageSubject(selector){
    console.log(selector);
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

function checkSchedule(aux){
    for(var counter = 0;counter < selectweekelements.length; counter ++){
        var inittime = document.getElementsByClassName('morninglist' + aux)[counter].value;
        if(selectweekelements[counter] && hasInsideElement(timesmorning[inittime],counter) && checkSameElement(timesmorning[inittime],counter)){
            throw "Horario invalido. Materias colicionando";
        }
    }
}

function checkTimeSelect(){
    if(JSON.stringify(selectweekelements) === '[false,false,false,false,false]'){
        throw "No se ha seleccionado ningun dia";
    }
}

function hasInsideElement(rownumber,cellnumber){
    return document.getElementById('scheduletable').rows[rownumber].cells[cellnumber].childElementCount != 0;
}

function checkSameElement(rownumber,cellnumber){
    return document.getElementById('scheduletable').rows[rownumber].cells[cellnumber].getElementsByClassName(popupoptionssubkeyselected).length == 0;
}

function addSubject(aux){
    if(document.getElementById('subjectspopup' + aux).value.split(',')[0] == ""){
        throw "Materia no seleccionada";
    }
    for(var counter = 0;counter < selectweekelements.length;counter ++){
        if(selectweekelements[counter]){
            var auxiliarnombremateria = document.getElementById('subjectspopup' + aux).value.split(',')[1];
            var auxiliarclavemateria = document.getElementById('subjectspopup' + aux).value.split(',')[0];
            if(aux != ""){
                auxiliarnombremateria = popupoptionssubjectselected;
                auxiliarclavemateria = popupoptionssubkeyselected;
            }
            var subject = {
                clave_aula:document.getElementsByClassName('classroomselect' + aux)[counter].value,
                clave_maestro:document.getElementById('teacherspopup' + aux).value.split(',')[0],
                clave_materia:auxiliarclavemateria,
                dia_semana:invertedweekdays[counter],
                hora_inicio:document.getElementsByClassName('morninglist' + aux)[counter].value,
                hora_termina:document.getElementsByClassName('finishhour' + aux)[counter].value,
                nombre_maestro:document.getElementById('teacherspopup' + aux).value.split(',')[1],
                nombre_materia:auxiliarnombremateria
            }
            chargeSubjectsTable(subject);
            subjects_schedule.push(subject);
        }
    }
    if(aux != 'option'){
        $('#' + document.getElementById('subjectspopup').value.split(',')[0] + 'options').remove();
        $('#' + document.getElementById('teacherspopup').value.split(',')[0]).remove();
    }
    closeAddScheduleButtons();
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