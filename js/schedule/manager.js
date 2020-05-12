let subjects_schedule = new Array();
let subjects_offer = new Array(); //Arreglo de materias
let map_subjects_teachers = new Array(); //Mapa de materias respecto a maestros
let classrooms;
let turno;
let clvgrp;

$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const key_value = urlParams.get('clave_grupo');
    clvgrp= key_value;
    const info = document.cookie.split(';');
    const carrerkey = info[0].split('=')[1];
    const groupgeneration = info[1].split('=')[1];
    turno = urlParams.get('turno');
    displayWindowSize();
    pageId(); 
    getSubjectSchedules(key_value);
    getOffer(key_value);
    chargeTime(turno);
    setGroupHeader(carrerkey, key_value, groupgeneration, turno);
    setTimeOption(turno);
    setFinalTime(turno,"finishhouroption");
    setFinalTime(turno,"finishhour");
    chargeOffer();
});

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

const handleResponse = response =>{
    subjects_schedule = JSON.parse(response);
    for(var counter=0;counter < subjects_schedule.length;counter ++){
        chargeSubjectsTable(subjects_schedule[counter]);
    }
}
const handleResponseUpdate = response =>{
    try {
        console.log(respone);
        let parsedResponse = JSON.parse(response);
        if(parsedResponse.status == 200){
            console.log("nice");
        }else{
            console.log("notnice");
        }
    } catch (e) {
        console.log(e);
        console.log(response);
    }
}
const handleOffer = response =>{
    let parsedResponse = JSON.parse(response);
    classrooms = parsedResponse.aulas; 
    deconstructSubjectResponse(parsedResponse.maestro_materia);
    classRoomDivCharge("classroomoption");
    classRoomDivCharge("classroom");
    chargeOffer();
    optionDivCharge();
}

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

function chargeSchedule(subject){   
    var outjson = JSON.stringify(subject);
    var outclv = JSON.stringify(clvgrp);
    console.log(outjson);
    console.log(outclv);
            $.ajax({
                method: "POST",
                url: "../php/update_schedule.php",
                data: { "horario":outjson, "clave":outclv },
             success: function (response) {
               console.log(response);
              },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
              }
              });
}

function deleteSub(subject){
    var outjson = JSON.stringify(subject);
    var outclv = JSON.stringify(clvgrp);
            $.ajax({
                method: "POST",
                url: "../php/remove_schedule.php",
                data: { "horario":outjson, "clave":outclv },
             success: function (response) {
               console.log(response);
              },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
              }
              });
}