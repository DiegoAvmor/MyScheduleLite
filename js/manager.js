//Cuando la página esta lista solicita los grupos y materias que existen
$(document).ready(() => {
    $.ajax({
      type: "GET",
      url: "../php/manage_data.php",
    })
      .done(handleResponse)
      .fail((xhr, status, error) => console.log(error));
});
/* WIP
//must delete insert into database
$("#insert").click(function(){
    $.ajax({
        type: "POST",
        url: "../MyScheduleLite/php/manage_data.php",
        data: {
            name : "Materia de relleno "
        }
        })
        .done(handleResponse)
        .fail((xhr, status, error) => console.log(error));
})

//must delete get ()
$("#get").click(function(){
    $.ajax({
        type: "GET",
        url: "../php/manage_data.php",
        data: {
        }
        })
        .done(handleResponse)
        .fail((xhr, status, error) => console.log(error));
})*/

const handleResponse = response =>{
    let respuesta = JSON.parse(response);
    let grupos = respuesta;
    for(var contador= 0;contador < grupos.length;contador++){
        let infogrupo = document.createElement('div');
        infogrupo.setAttribute("class","texto barragrupos");
        infogrupo.setAttribute("onclick","gruposClickEvent(this)");
        infogrupo.innerHTML = grupos[contador].grupo.clave_carrera + " - Grupo" 
        + grupos[contador].grupo.clave_grupo + '<img id="divisor" src="../images/iconos/divisor.png" alt="divisor"> Generación: '
        + grupos[contador].grupo.ciclo_escolar + ' - ' + grupos[contador].grupo.turno;
        $("#grupos").append(infogrupo);
        console.log(grupos[contador]);
    }
}

var elementselected = null;

function gruposClickEvent(gruposeleccionado){
    if(elementselected){
        elementselected.style.width = "";
        elementselected.style.height = "";
        elementselected.style.position = "";
        elementselected.style.paddingTop = "";
        elementselected.style.transition = "";
        elementselected.style.boxShadow = "";
        elementselected.style.border = "";
    }
    gruposeleccionado.style.width = "420px";
    gruposeleccionado.style.height = "50px";
    gruposeleccionado.style.position = "relative";
    gruposeleccionado.style.paddingTop = "25px";
    gruposeleccionado.style.border = "1px solid";
    elementselected = gruposeleccionado;
}