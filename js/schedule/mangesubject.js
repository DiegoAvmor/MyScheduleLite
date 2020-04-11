var invertedweekdays = {
    0:"Lunes",
    1:"Martes",
    2:"Miercoles",
    3:"Jueves",
    4:"Viernes"
}

function clic(){
    for(var counter = 0;counter < selectweekelements.length; counter ++){
        var inittime = document.getElementsByClassName('morninglist')[counter].value;
        var finaltime = document.getElementsByClassName('finishhour')[counter].value;
        if(selectweekelements[counter] && document.getElementById('scheduletable').rows[timesmorning[inittime]].cells[counter].childElementCount != 0){
            console.log("error");
            return;
        }
    }
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
    $('#' + document.getElementById('subjectspopup').value.split(',')[0]).remove();
    console.log(subjects_schedule);
}