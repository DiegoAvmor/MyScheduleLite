//Cuando la página esta lista solicita los grupos y materias que existen
$(document).ready(() => {
    $.ajax({
      type: "GET",
      url: "../MyScheduleLite/php/manage_data.php",
    })
      .done(handleResponse)
      .fail((xhr, status, error) => console.log(error));
});
//debido a la falta de información sobre como se hara la 
//solicitud, se opto por validad los campos
$("#generate").click(function(){
    $.ajax({
        type: "POST",
        url: "../MyScheduleLite/php/generate_schedule.php",
        data: {
            //Aqui deben de ir los datos para generar el horario
            //Es donde tengo mis dudas
        }
        })
        .done(handleResponse)
        .fail((xhr, status, error) => console.log(error));
})

$("#update").click(function(){
    $.ajax({
        type: "POST",
        url: "../MyScheduleLite/php/update_schedule.php",
        data: {
            nombre: "Carlos el admin"
        }
        })
        .done(handleResponse)
        .fail((xhr, status, error) => console.log(error));
})

$("#remove").click(function(){
    $.ajax({
        type: "POST",
        url: "../MyScheduleLite/php/remove_schedule.php",
        data: {
            nombre: "Carlos el admin"
        }
        })
        .done(handleResponse)
        .fail((xhr, status, error) => console.log(error));
})

//must delete insert
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
        url: "../MyScheduleLite/php/manage_data.php",
        data: {
        }
        })
        .done(handleResponse)
        .fail((xhr, status, error) => console.log(error));
})

const handleResponse = response =>{
    //let parsedResponse = JSON.parse(response);
    console.log(response);
}