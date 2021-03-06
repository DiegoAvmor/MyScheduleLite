function addSubject(){
    try{
        validateUpdate();
        checkTimeSelect();
        checkScheduleAdd();
        checkSubjectSelected("subjectspopup");      
        addInfoSchedule();
    }catch(error){
        document.getElementById('errordiv').style.paddingTop = '15px';
        $("#errordiv").empty();
        $("#errordiv").append('<div class = "inlineblocks errormessage">' +  error + '</div>');
        document.getElementById("errordiv").style.display = "block";
        if(error.includes("coincidencias")){
            document.getElementById('errordiv').style.paddingTop = '0px';
        }
    }
}

function editSubject(){
    let arrayselectsubject = getActualInformation();
    try{
        deleteSubject();
        validateUpdateEdit();
        checkTimeSelect();
        checkScheduleEdit(); 
        editInfoSchedule();
    }catch(error){
        document.getElementById('errordivoption').style.paddingTop = '15px';
        $("#errordivoption").empty();
        $("#errordivoption").append('<div class = "inlineblocks errormessage">' +  error + '</div>');
        document.getElementById("errordivoption").style.display = "block";
        overlay.classList.add('active');
        restoreInfo(arrayselectsubject);
        if(error.includes("coincidencias")){
            document.getElementById('errordivoption').style.paddingTop = '0px';
        }
    }
}

function restoreInfo(arrayselectsubject){
    arrayselectsubject.forEach(function(item){
        chargeSubjectsTable(item);
        chargeSchedule(item);
        subjects_schedule.push(item);
    });
}

function getActualInformation(){
    let arrayselectsubject = new Array();
    subjects_schedule.forEach(function(item,index){
        if(item.clave_materia == popupoptionssubkeyselected){
            arrayselectsubject.push(item);
        }
    });
    return arrayselectsubject;
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
        var inittime = document.getElementsByClassName('morninglistoption')[counter].value;
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
            chargeSchedule(subject);
            subjects_schedule.push(subject);
        }
    }
    $('#' + document.getElementById('subjectspopup').value.split(',')[0] + 'options').remove();
    $('#' + document.getElementById('teacherspopup').value.split(',')[0]).remove();
    closeAddScheduleButtons();
}

function editInfoSchedule(){
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
            chargeSchedule(subject);
        }
    }
    closeModalButtons("editionpopup");
}

function deleteSubject(editflag){
    $('.' + popupoptionssubkeyselected).remove();
    for(var counter = 0;counter < subjects_schedule.length;counter ++){
        if(popupoptionssubkeyselected === subjects_schedule[counter].clave_materia){
            subjects_schedule.splice(counter,1);
            counter --;
        }
    }
    if(editflag != undefined){
        subjectselect.append('<option id= "' + popupoptionssubkeyselected + 'options" value = "' + popupoptionssubkeyselected + ',' + popupoptionssubjectselected + '" >' + popupoptionssubjectselected + '</option>');
    }
    deleteSub(popupoptionssubkeyselected);
    closeModalButtons('optionspopup');
}


function validateUpdate(){
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
            var output=validateSub(subject);
            if(output.status==400){
                throw output.message;
            }else{
                console.log("Válido");
            }
        }
    }
}

function validateUpdateEdit(){
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
            
        }
    }
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
            var output=validateSub(subject);
            if(output.status==400){
                throw output.message;
            }else{
                console.log("Válido");
            }
        }
    }
}