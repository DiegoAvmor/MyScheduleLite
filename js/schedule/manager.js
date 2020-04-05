let subjects_schedule;
let subjects_offer = new Array(); //Arreglo de materias
let map_subjects_teachers = new Array(); //Mapa de materias respecto a maestros

$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const key_value = urlParams.get('clave_grupo')
    const turno = urlParams.get('turno');
    getSubjectSchedules(key_value);
    getOffer(key_value);
    displayWindowSize();
    pageId();
    groupInfo();
    chargeTime(turno);
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
    var subjects = JSON.parse(response);
    for(var counter=0;counter < subjects.length;counter ++){
        chargeSubjectsTable(subjects[counter]);
    }
}

const handleOffer = response =>{
    let parsedResponse = JSON.parse(response);
    deconstructSubjectResponse(parsedResponse.maestro_materia);
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