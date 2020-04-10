//associative subjects
var timesmorning = {
    "7:00":1,
    "7:30":2,
    "8:00":3,
    "8:30":4,
    "9:00":5,
    "9:30":6,
    "10:00":7,
    "10:30":8,
    "11:00":9,
    "11:30":10,
    "12:00":11,
    "12:30":12,
    "13:00":13,
    "13:30":14,
}

var timesafternoon = {
    "14:00":15,
    "14:30":16,
    "15:00":17,
    "15:30":18,
    "16:00":19,
    "16:30":20,
    "17:00":21,
    "17:30":22,
    "18:00":23,
    "18:30":24,
    "19:00":25,
    "19:30":26,
    "20:00":27,
    "20:30":28
}

var weekdays = {
    "Lunes":0,
    "Martes":1,
    "Miercoles":2,
    "Jueves":3,
    "Viernes":4
}

function chargeTime(turno){
   document.getElementById(turno).style.display = 'block';
}

function pageId(){
    document.getElementById("scheduleid").style.backgroundColor = "black";
}

/**
 * 
<div class = "scheduleinfo">
    <div class = "scheduletitle montserratfont font16 fontsemibold">Fundamentos de ingnieria de software</div><img src = "../images/iconos/options.png" class = "optionsbuton">
    <img id = "horizontalseparator" src = "../images/iconos/horizontalseparator.png">
    <p class = "montserratfont font16">Nombre del maestro</p>
    <p class = "montserratfont font16">Aula</p>
</div>
 */
function chargeSubjectsTable(subject){
    let newschedulelement = document.createElement('div');
    newschedulelement.setAttribute("class","scheduleinfo");
    let newsubjecttitle = document.createElement('div');
    newsubjecttitle.setAttribute("class","scheduletitle montserratfont font16 fontsemibold");
    newsubjecttitle.innerHTML = subject.nombre_materia;
    let newoptionsbutton = document.createElement("button");
    newoptionsbutton.setAttribute("onclick","openModalButtons()");
    newoptionsbutton.setAttribute("class","optionsbuton");
    let newseparator = document.createElement("img");
    newseparator.setAttribute("id","horizontalseparator");
    newseparator.setAttribute("src","../images/iconos/horizontalseparator.png");
    let newteachername = document.createElement("p");
    newteachername.setAttribute("class","montserratfont font16");
    newteachername.innerHTML = subject.nombre_maestro;
    let newroomname = document.createElement("p");
    newroomname.setAttribute("class","montserratfont font16");
    newroomname.innerHTML = "Aula: " + subject.clave_aula;
    newschedulelement.append(newsubjecttitle);
    newschedulelement.append(newoptionsbutton);
    newschedulelement.append(newseparator);
    newschedulelement.append(newteachername);
    newschedulelement.append(newroomname);
    document.getElementById("scheduletable").rows[timesmorning[subject.hora_inicio]].cells[weekdays[subject.dia_semana]].append(newschedulelement);
}

function openModalButtons(){
    const modal = document.getElementById('optionspopup');
    if(modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModalButtons(){
    const modal = document.getElementById('optionspopup');
    if(modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function openAddScheduleButtons(){
    const modal = document.getElementById('addschedulepopup');
    if(modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('activenoopacity');
    chargeOffer();
}

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
function setFinalTime(turn){
    var divfinalhours = $('.finishhour');
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
    console.log(subjects_offer);
    console.log(subjects);
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
        classRoomDivCharge();
        hasbeencharged = true;
    }
}

var subjectselect = $('#subjectspopup');
function optionDivCharge(){
    for(var counter = 0; counter<subjects_offer.length; counter ++){
        subjectselect.append('<option value = ' + subjects_offer[counter].clave_materia + '>' + subjects_offer[counter].nombre_materia + '</option>');
    }
}

var teacherselect = $('#teacherspopup');
function teacherSectionCharge(subjectselected){
    teacherselect.empty();
    var subjectkey = subjectselected.value;
    for(var counter = 0;counter < map_subjects_teachers.length;counter ++){
        if(map_subjects_teachers[counter].key === subjectkey){
            teachersDivCharge(map_subjects_teachers[counter].teachers);
            break;
        }
    }
}

function teachersDivCharge(teachersarray){
    for(var counter = 0;counter < teachersarray.length; counter ++){
        teacherselect.append('<option>' + teachersarray[counter].nombre_maestro + '</option>');
    }
}

function closeAddScheduleButtons(){
    const modal = document.getElementById('addschedulepopup');
    if(modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('activenoopacity');
}

function displayWindowSize(){
    document.getElementById("barratareas").style.height = document.documentElement.clientHeight - 110 + "px";
}

window.addEventListener("resize",displayWindowSize);

function displayElementWeek(value){
    if(value.style.color != 'rgb(254, 153, 0)'){
        value.style.color = 'rgb(254, 153, 0)';
        document.getElementsByName(value.id)[0].style.display = "block";
        return;
    }
    value.style.color = '#444444';
    document.getElementsByName(value.id)[0].style.display = "none";
}

function setFinalHour(optionsection,numbersection){
    var originalvalue = optionsection.value;
    var minutesdigit = originalvalue.split(':');
    var divoptionshour = document.getElementsByClassName('finishhour')[numbersection];
    if(minutesdigit[1] == '00'){
        divoptionshour.value = minutesdigit[0] + ':30';
        return;
    }
    divoptionshour.value = parseInt(minutesdigit[0]) + 1 + ':00';
}

function classRoomDivCharge(){
    var classroomdiv = document.getElementsByName("classroom");
    console.log(classrooms);
    for(var counter = 0;counter < classroomdiv.length;counter ++){
        for(var counter2 = 0;counter2 < classrooms.length;counter2 ++){
            var optiondivclassroom = document.createElement('option');
            optiondivclassroom.setAttribute('value',classrooms[counter2].clave_aula);
            optiondivclassroom.innerHTML = classrooms[counter2].clave_aula;
            classroomdiv[counter].append(optiondivclassroom);
        }
    }
}