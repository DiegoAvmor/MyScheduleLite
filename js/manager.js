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
        infogrupo.setAttribute("onclick","gruposClickEvent()");
        infogrupo.innerHTML = grupos[contador].grupo.clave_carrera + " - Grupo" 
        + grupos[contador].grupo.clave_grupo + '<img id="divisor" src="../images/iconos/divisor.png" alt="divisor"> Generación: '
        + grupos[contador].grupo.ciclo_escolar + ' - ' + grupos[contador].grupo.turno;
        $("#grupos").append(infogrupo);
        console.log(grupos[contador]);
    }
   // focusButtonFunction();
}

function focusButtonFunction(){
    var elements = document.getElementsByClassName("barragrupos");
    for (var i = 0, len = elements.length; i < len; i++) {
        //elements[i].onclick = gruposClickEvent();
        elements[i].addEventListener("click", alert("hola mundo"));
    }
}

function gruposClickEvent(){
    alert("hola mundo");
}