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


const handleResponse = response =>{
    grupos = JSON.parse(response);
    console.log(grupos);
    pageId();
    createDivsGrous();
}