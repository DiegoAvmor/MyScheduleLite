const TURNOS = ["Vespertino","Madrugada"];

//Cuando la página esta lista solicita los grupos y materias que existen
$(document).ready(() => {
    $.ajax({
      type: "GET",
      url: "../php/manage_data.php",
    })
      .done(handleResponse)
      .fail((xhr, status, error) => console.log(error));
});

$("#searchBar").on("keyup",function(){
    let input = $(this).val().toLowerCase();
    if(input && input.length >0){
        domGrupos.forEach(grupo => {
            let id = grupo.id.toLowerCase();
            if(!input.includes(id)){
                grupo.style.display = "none";
            }else{
                grupo.style.display = "block";
            }
        });
    }else{
        domGrupos.forEach(grupo => {
            grupo.style.display = "block";
        });
    }
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

var grupos;
var domGrupos = new Array();//Elementos DOM de los grupos
const handleResponse = response =>{
    let respuesta = JSON.parse(response);
    grupos = respuesta;
    for(var contador= 0;contador < grupos.length;contador++){
        let infogrupo = document.createElement('div');
        infogrupo.setAttribute("class","texto barragrupos");
        infogrupo.setAttribute("onclick","gruposClickEvent(this)");
        infogrupo.setAttribute("id","Grupo " + grupos[contador].grupo.clave_grupo );
        infogrupo.innerHTML = grupos[contador].grupo.clave_carrera + " - Grupo" 
        + grupos[contador].grupo.clave_grupo + '<img id="divisor" src="../images/iconos/divisor.png" alt="divisor"> Generación: '
        + grupos[contador].grupo.ciclo_escolar + ' - ' + TURNOS[grupos[contador].grupo.turno];
        $("#grupos").append(infogrupo);
        domGrupos.push(infogrupo);
    }
    nuevoselementos = document.getElementsByClassName("barragrupos");
    for(var contador = 0;contador<nuevoselementos.length;contador++){
        nuevoselementos[contador].value = contador;
    }
    let idindicador = document.getElementsByClassName("barraindicador")[0].style.backgroundColor = "black";
}