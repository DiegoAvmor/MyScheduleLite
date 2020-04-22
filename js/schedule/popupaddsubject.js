function setTimeOption(turno){
    const selecttime = $('.begtime');
    var times = ['14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30'];
    if(turno == 'Matutino'){
        times = ['7:00','7:30','8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30'];
    }
    for(var counter = 0;counter < selecttime.length;counter ++){
        for(var counter2 = 0;counter2 < times.length;counter2 ++){
            var optiondiv = document.createElement('option');
            optiondiv.setAttribute('value',times[counter2]);
            optiondiv.innerHTML = times[counter2];
            selecttime[counter].append(optiondiv);
        }
    }
}

/**
 * Esta funcion sirve para parchar un issue
 * Al momento de seleccionar un horario de inicio diferente de las 7:00, se cambia normal la hora de finalizacion
 * El problema es al momento de refresar la pagina, el horario final anterior perciste, quedando tal como:
 * 7:00 - 10:00
 * Lo que puede provocar issues futuros
 */
function setFinalTime(turn,divnamefinalhours){
    var divfinalhours = $('.' + divnamefinalhours);
    var hour = '14:30';
    if(turn == 'Matutino'){
        hour = '7:30';
    }
    for(var counter = 0;counter < divfinalhours.length;counter ++){
        divfinalhours[counter].value = hour;
    }
}

var hasbeencharged = false;
function chargeOffer(){
    if(!hasbeencharged){
        for(var counter=0;counter < subjects_schedule.length;counter ++){
            for(var counter2=0;counter2 < subjects_offer.length;counter2 ++){
                if(subjects_offer[counter2].clave_materia === subjects_schedule[counter].clave_materia){
                    subjects_offer.splice(counter2);
                    break;
                }
            }
        }
        optionDivCharge();
        classRoomDivCharge("classroom");
        hasbeencharged = true;
    }
}

var subjectselect = $('#subjectspopup');
function optionDivCharge(){
    for(var counter = 0; counter<subjects_offer.length; counter ++){
        subjectselect.append('<option id= "' + subjects_offer[counter].clave_materia + 'options" value = "' + subjects_offer[counter].clave_materia + ',' + subjects_offer[counter].nombre_materia + '" >' + subjects_offer[counter].nombre_materia + '</option>');
    }
}

var teacherselect = $('#teacherspopup');
function teacherSectionCharge(subjectselected){
    teacherselect.empty();
    var subjectkey = subjectselected.value.split(',')[0];
    for(var counter = 0;counter < map_subjects_teachers.length;counter ++){
        if(map_subjects_teachers[counter].key === subjectkey){
            teachersDivCharge(map_subjects_teachers[counter].teachers);
            break;
        }
    }
}

function teachersDivCharge(teachersarray){
    for(var counter = 0;counter < teachersarray.length; counter ++){
        teacherselect.append('<option id = "' + teachersarray[counter].clave_maestro + '" value = "' + teachersarray[counter].clave_maestro + ',' +  teachersarray[counter].nombre_maestro +'">' + teachersarray[counter].nombre_maestro + '</option>');
    }
}

var selectweekelements = [false,false,false,false,false];
function displayElementWeek(value,numberelement){
    if(!selectweekelements[numberelement]){
        value.style.color = 'rgb(254, 153, 0)';
        document.getElementsByName(value.id)[0].style.display = "block";
        selectweekelements[numberelement] = true;
        return;
    }
    selectweekelements[numberelement] = false;
    value.style.color = '#444444';
    document.getElementsByName(value.id)[0].style.display = "none";
}

function setFinalHour(optionsection,numbersection,divfinishname){
    var originalvalue = optionsection.value;
    var minutesdigit = originalvalue.split(':');
    var divoptionshour = document.getElementsByClassName(divfinishname)[numbersection];
    if(minutesdigit[1] == '00'){
        divoptionshour.value = minutesdigit[0] + ':30';
        return;
    }
    divoptionshour.value = parseInt(minutesdigit[0]) + 1 + ':00';
}

function classRoomDivCharge(divclassroom){
    var classroomdiv = document.getElementsByName(divclassroom);
    for(var counter = 0;counter < classroomdiv.length;counter ++){
        for(var counter2 = 0;counter2 < classrooms.length;counter2 ++){
            var optiondivclassroom = document.createElement('option');
            optiondivclassroom.setAttribute('value',classrooms[counter2].clave_aula);
            optiondivclassroom.innerHTML = classrooms[counter2].clave_aula;
            classroomdiv[counter].append(optiondivclassroom);
        }
    }
}