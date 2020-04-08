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
    const info = document.cookie.split(';');
    const carrerkey = info[0].split('=')[1];
    const groupgeneration = info[1].split('=')[1];
    setGroupHeader(carrerkey, key_value, groupgeneration, turno);
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
    console.log(subjects);
    for(var counter=0;counter < subjects.length;counter ++){
        chargeSubjectsTable(subjects[counter]);
        console.log("hey");
        for(var counter2=0;counter2 < subjects_offer.length;counter2 ++){
            console.log(subjects_offer[counter2].clave_materia);
            console.log(subjects[counter].clave_materia)
            if(subjects_offer[counter2].clave_materia === subjects[counter].clave_materia){
                subjects_offer.splice(counter2);
                break;
            }
        }
    }
    console.log(subjects_offer);
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
    chargeSchedulesPopUp();
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

function setGroupHeader(keycarrer, keygroup, groupgeneration, groupturn){
    $('#groupinfo').append(
        '<h2>' + keycarrer + ' - Grupo' 
    + keygroup + '<img id = "separadortitulo" src="../images/iconos/divisor.png" alt="divisor">Generación: '
    + groupgeneration + ' - ' + groupturn + "</h2>"    );
}