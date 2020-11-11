<?php
include 'model/SimpleResponse.php';

$response = validate_user();
echo $response -> get_JSON();

function validate_user()
{
    session_start();
    $response = new SimpleResponse(403,"../login.html");
    if(isset($_SESSION))
    {
        if(isset($_SESSION['access']) && $_SESSION['access']){
            $response -> set_status(200);
            $response -> set_message("Welcome! " . $_SESSION['user']);
        }
    }
    return $response;
}


?>