
$("#logBtn").click(function(){
    let emailInput = $("#email");
    let passwordInput = $("#password");
    if( emailInput.val() && passwordInput.val() ){
        $.ajax({
            type: "POST",
            url: "../MyScheduleLite/php/authenticate_user.php",
            data: {
              email: emailInput.val(),
              password: passwordInput.val()
            }
          })
          .done(handleResponse)
          .fail((xhr, status, error) => console.log(error));
    }
})

const handleResponse = response =>{
    try {
        let parsedResponse = JSON.parse(response);
        if(parsedResponse.status == 200){
            document.location.replace(parsedResponse.message);
        }else{
            //Show Pop up message
            generateResponseMessage(parsedResponse.message);
        }
    } catch (e) {
        console.log(e);
        console.log(response);
    }
}

function generateResponseMessage(message){
    let alertDiv = document.createElement('div');
    alertDiv.setAttribute("class","alert alert-danger");
    alertDiv.setAttribute("role","alert");
    alertDiv.innerHTML = message +"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
    $("#container").append(alertDiv);
}

$().alert('close')