function chargeSubjectName(){
    var actualteacher,actualclassroom;
    document.getElementById('subjectspopupoption').value = popupoptionssubjectselected;
    setTeachersEdit();
    for(var counter = 0;counter < subjects_schedule.length;counter ++){
        if(subjects_schedule[counter].clave_materia === popupoptionssubkeyselected){
            setValuesModal(subjects_schedule[counter]);
            actualteacher = subjects_schedule[counter].nombre_maestro;
        }
    }
}

function setTeachersEdit(){
    for(var counter = 0;counter < map_subjects_teachers.length;counter ++){
        if(map_subjects_teachers[counter].key === popupoptionssubkeyselected){
            teachersDivChargeOption(map_subjects_teachers[counter].teachers);
            break;
        }
    }
}

function teachersDivChargeOption(teachersoffer){
    $('#teacherspopupoption').empty();
    for(var counter = 0;counter < teachersoffer.length;counter ++){
        $('#teacherspopupoption').append('<option id = "' + teachersoffer[counter].clave_maestro + '" value = "' + teachersoffer[counter].clave_maestro + ',' +  teachersoffer[counter].nombre_maestro +'">' + teachersoffer[counter].nombre_maestro + '</option>');
    }
}

function setValuesModal(jsonvalues){
    displayElementWeek($('.dayspopupoption')[weekdays[jsonvalues.dia_semana]],weekdays[jsonvalues.dia_semana]);
    var timeelement = document.getElementsByClassName("begtime")[weekdays[jsonvalues.dia_semana]];
    timeelement.value = jsonvalues.hora_inicio;
    setFinalHour(timeelement,weekdays[jsonvalues.dia_semana],"finishhouroption");
    document.getElementsByClassName("classroomselectoption")[weekdays[jsonvalues.dia_semana]].value = jsonvalues.clave_aula;
}