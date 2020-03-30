$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const key_value = urlParams.get('clave_grupo')
    getSubjectSchedules(key_value);
    getOffer(key_value);
});

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
    console.log(response);
    console.log(JSON.parse(response));
}

const handleOffer = response =>{
    let parsedOffer = JSON.parse(response);
    parsedOffer.forEach(offer => {
        console.log(offer);
    });
}