const handleValidation = authResponse =>{
    console.log(authResponse);
    let parsedResponse = JSON.parse(authResponse);
    if(parsedResponse.status != 200){
        document.location.replace(parsedResponse.message);
    }else{
        //Show Welcome pop up
        console.log(parsedResponse.message);
        //generateResponseMessage(parsedResponse.message);
    }
}

function validateUser(){
    $.ajax({
        type: "GET",
        url: "../php/validate_user.php",
    })
    .done(handleValidation)
    .fail((xhr, status, error) => console.log(error));
}

validateUser();