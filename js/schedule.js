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

$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const key_value = urlParams.get('clave_grupo')
    const turno = urlParams.get('turno');
    console.log("Aqui esta el turno rico: " + turno);
    getSubjectSchedules(key_value);
    getOffer(key_value);
    displayWindowSize();
    pageId();
    if(turno === 'Matutino'){
        chargeTime(7);
    }
    else{
        chargeTime(14);
    }
});

const numberhoursturn = 7;
function chargeTime(classbeginning){
    let divhours = $('#hours');
    let htmldivtime;
    for(var counter = 0;counter < numberhoursturn; counter++){
        htmldivtime = document.createElement('div');
        htmldivtime.setAttribute("class","time texto font16");
        htmldivtime.innerHTML = classbeginning + counter + ":00";
        divhours.append(htmldivtime);
        htmldivtime = document.createElement('div');
        htmldivtime.setAttribute("class","time texto font16");
        htmldivtime.innerHTML = classbeginning + counter + ":30";
        divhours.append(htmldivtime);
    }
    htmldivtime = document.createElement('div');
    htmldivtime.setAttribute("class","time");
    htmldivtime.innerHTML = classbeginning + numberhoursturn + ":00";
    divhours.append(htmldivtime);
}

function pageId(){
    document.getElementById("scheduleid").style.backgroundColor = "black";
}

function getOffer(clave_grupo){
    $.ajax({
        type: "GET",
        url: "../php/manage_offer.php",
        data: {
            "clave_grupo": clave_grupo
        }
      })
        .done(handleOffer)
        .fail((xhr, status, error) => console.log(error));
}


function getSubjectSchedules(clave_grupo){
    $.ajax({
        type: "GET",
        url: "../php/manage_subject_data.php",
        data: {
            "clave_grupo": clave_grupo
        }
      })
        .done(handleResponse)
        .fail((xhr, status, error) => console.log(error));
}

const handleResponse = response =>{
    var subjects = JSON.parse(response);
    for(var counter=0;counter < subjects.length;counter ++){
        chargeSubjectsTable(subjects[counter]);
    }
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
    let newoptionsbutton = document.createElement("img");
    newoptionsbutton.setAttribute("src","../images/iconos/options.png");
    newoptionsbutton.setAttribute("class","optionsbuton");
    let newseparator = document.createElement("img");
    newseparator.setAttribute("id","horizontalseparator");
    newseparator.setAttribute("src","../images/iconos/horizontalseparator.png");
    let newteachername = document.createElement("p");
    newteachername.setAttribute("class","montserratfont font16");
    newteachername.innerHTML = subject.nombre_maestro;
    let newroomname = document.createElement("p");
    newroomname.setAttribute("class","montserratfont font16");
    newseparator.innerHTML = "Aula: " + subject.clave_aula;
    newschedulelement.append(newsubjecttitle);
    newschedulelement.append(newoptionsbutton);
    newschedulelement.append(newseparator);
    newschedulelement.append(newteachername);
    newschedulelement.append(newroomname);
    console.log(subject.dia_semana);
    console.log(subject.hora_inicio);
    console.log(weekdays[subject.dia_semana]);
    console.log(timesmorning[subject.hora_inicio]);
   document.getElementById("scheduletable").rows[timesmorning[subject.hora_inicio]].cells[weekdays[subject.dia_semana]].append(newschedulelement);
}

const handleOffer = response =>{
    let parsedResponse = JSON.parse(response);
    deconstructSubjectResponse(parsedResponse.maestro_materia);
}

let subjects_schedule;
let subjects_offer = new Array(); //Arreglo de materias
let map_subjects_teachers = new Array(); //Mapa de materias respecto a maestros

function deconstructSubjectResponse(subject_teacher_relations){
    subject_teacher_relations.forEach(relation => {
        if(!checkSubjectInArray(relation.clave_materia)){
            subjects_offer.push({"clave_materia":relation.clave_materia,"nombre_materia":relation.nombre_materia});
        }
    });
    map_subjects_teachers = subjects_offer.map(subject => {
        let relation = {};
        relation["key"] = subject.clave_materia;
        relation["teachers"] = getTeachersBySubjectId(subject.clave_materia,subject_teacher_relations);
        return relation;
    });
}

function checkSubjectInArray(subject_id){
    return subjects_offer.find(subject => subject.clave_materia == subject_id);
}

function getTeachersBySubjectId(subject_id, array){
    let teachers = new Array();
    array.forEach(relation => {
        if(relation.clave_materia == subject_id){
            teachers.push({"clave_maestro": relation.clave_maestro , "nombre_maestro": relation.nombre_maestro});
        }
    });
    return teachers;
}

function displayWindowSize(){
    document.getElementById("barratareas").style.height = document.documentElement.clientHeight - 110 + "px";
}