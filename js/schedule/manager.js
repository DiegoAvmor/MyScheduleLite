let subjects_schedule = new Array();
let subjects_offer = new Array(); //Arreglo de materias
let map_subjects_teachers = new Array(); //Mapa de materias respecto a maestros
let classrooms;
let turno;

$(document).ready(function(){
    displayWindowSize();
    pageId();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const key_value = urlParams.get('clave_grupo')
    turno = urlParams.get('turno');   
    getSubjectSchedules(key_value);
    getOffer(key_value);
    chargeTime(turno);
    const info = document.cookie.split(';');
    const carrerkey = info[0].split('=')[1];
    const groupgeneration = info[1].split('=')[1];
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

const handleOffer = response =>{
    let parsedResponse = JSON.parse(response);
    classrooms = parsedResponse.aulas; 
    deconstructSubjectResponse(parsedResponse.maestro_materia);
    classRoomDivCharge("classroomoption");
    classRoomDivCharge("classroom");
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

function chargeSchedule(){
    console.log(subjects_schedule);
}