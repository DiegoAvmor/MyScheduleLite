var invertedweekdays = {
    0:"Lunes",
    1:"Martes",
    2:"Miercoles",
    3:"Jueves",
    4:"Viernes"
}

function clic(){
    for(var counter = 0;counter < selectweekelements.length;counter ++){
        if(selectweekelements[counter]){
            var subject = {
                clave_aula:document.getElementsByClassName('classroomselect')[counter].value,
                dia_semana:invertedweekdays[counter],
                hora_inicio:document.getElementsByClassName('morninglist')[counter].value,
                hora_termina:document.getElementsByClassName('finishhour')[counter].value,
                nombre_maestro:document.getElementById('teacherspopup').value,
                nombre_materia:document.getElementById('subjectspopup').value
            }
            chargeSubjectsTable(subject);
        }
    }
}