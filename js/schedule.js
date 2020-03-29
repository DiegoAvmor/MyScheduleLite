$(document).ready(function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const key_value = urlParams.get('clave_grupo')
    getSubjectSchedules(key_value);
    console.log(key_value);
    console.log(Cookies.get('name')+ "hola");
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

const handleResponse = response =>{
    console.log(response);
    console.log(JSON.parse(response));
}