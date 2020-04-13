function chargeSubjectName(){
    document.getElementById('subjectspopupoption').value = popupoptionssubjectselected;
    console.log(subjects_schedule);
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
            console.log(map_subjects_teachers[counter].teachers);
            teachersDivChargeOption(map_subjects_teachers[counter].teachers);
            break;
        }
    }
}

function teachersDivChargeOption(teachersoffer){
    $('#teacherspopupoption').empty();
    for(var counter = 0;counter < teachersoffer.length;counter ++){
        console.log($('#teacherspopupoption'));
        $('#teacherspopupoption').append('<option id = "' + teachersoffer[counter].clave_maestro + '" value = "' + teachersoffer[counter].clave_maestro + ',' +  teachersoffer[counter].nombre_maestro +'">' + teachersoffer[counter].nombre_maestro + '</option>');
    }
}

function setValuesModal(jsonvalues){
    console.log(jsonvalues);

}