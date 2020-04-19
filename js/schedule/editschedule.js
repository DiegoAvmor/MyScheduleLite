function chargeSubjectName(){
    document.getElementById('subjectspopupoption').value = popupoptionssubjectselected;
    setTeachersEdit();
    for(var counter = 0;counter < subjects_schedule.length;counter ++){
        if(subjects_schedule[counter].clave_materia === popupoptionssubkeyselected){
            setValuesModal(subjects_schedule[counter]);
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
    displayElementWeek($('.dayspopupoption')[weekdays[jsonvalues.dia_semana]],jsonvalues.dia_semana);
}