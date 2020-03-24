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
    let parsedResponse = JSON.parse(response);
    let gruposasignados = parsedResponse.assigned;
    for(var contador= 0;contador < gruposasignados.length;contador++){
        let infogrupo = document.createElement('div');
        infogrupo.setAttribute("class","texto barragrupos");
        infogrupo.innerHTML = "informacion";
        $("#grupos").append(infogrupo);
        console.log(gruposasignados[contador]);
    }
}