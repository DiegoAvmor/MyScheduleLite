function manageSubject(selector){
    try{
        var complement = getComplement(selector);
        checkSchedule(complement);
        if(selector){
            deleteSubject();
        }
        addSubject(complement);
    }catch(error){
        console.log(error);
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
        if(selectweekelements[counter] && document.getElementById('scheduletable').rows[timesmorning[inittime]].cells[counter].childElementCount != 0){
            console.log("error");
            throw "Horario invalido. Materias colicionando";
        }
    }
}

function addSubject(aux){
    for(var counter = 0;counter < selectweekelements.length;counter ++){
        if(selectweekelements[counter]){
            var subject = {
                clave_aula:document.getElementsByClassName('classroomselect' + aux)[counter].value,
                clave_maestro:document.getElementById('teacherspopup' + aux).value.split(',')[0],
                clave_materia:document.getElementById('subjectspopup' + aux).value.split(',')[0],
                dia_semana:invertedweekdays[counter],
                hora_inicio:document.getElementsByClassName('morninglist' + aux)[counter].value,
                hora_termina:document.getElementsByClassName('finishhour' + aux)[counter].value,
                nombre_maestro:document.getElementById('teacherspopup' + aux).value.split(',')[1],
                nombre_materia:document.getElementById('subjectspopup' + aux).value.split(',')[1]
            }
            chargeSubjectsTable(subject);
            subjects_schedule.push(subject);
        }
    }
    $('#' + document.getElementById('subjectspopup').value.split(',')[0] + 'options').remove();
    $('#' + document.getElementById('teacherspopup').value.split(',')[0]).remove();
    closeAddScheduleButtons();
}

function deleteSubject(){
    $('.' + popupoptionssubkeyselected).remove();
    for(var counter = 0;counter < subjects_schedule.length;counter ++){
        if(popupoptionssubkeyselected === subjects_schedule[counter].clave_materia){
            console.log("hola");
            subjects_schedule.splice(counter);
        }
    }
    console.log(subjects_schedule);
    subjectselect.append('<option id= "' + popupoptionssubkeyselected + 'options" value = "' + popupoptionssubkeyselected + ',' + popupoptionssubjectselected + '" >' + popupoptionssubjectselected + '</option>');
    selectweekelements = [false,false,false,false,false];
    closeModalButtons('optionspopup');
}