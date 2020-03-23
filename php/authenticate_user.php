<?php
include_once 'db.php';
include 'model/SimpleResponse.php';

$email = $_POST['email'];
$password = $_POST['password'];

$response = authenticate($email,$password);
echo $response -> get_JSON();

function authenticate($email,$password){
    $dbconnection= establishConnectionDB();
    $response = new SimpleResponse(403,"Invalid Administrator");
    if($dbconnection->has("administrador",["email"=> $email])){
        //Es un administrador, hace falta validar que su contraseña
        $credentials = $dbconnection->get("administrador",[
            "[<]usuarios"=>"email"
        ],[
            "administrador.email",
            "usuarios.password"
        ],[
            "administrador.email" => $email
        ]);
        if($credentials['password']===$password){
            $response -> set_status(200);
            $response -> set_message("../MyScheduleLite/pages/main.html");
            session_start();
            $_SESSION['access'] = true;
            $_SESSION['user'] = $email;
        }else{
            $response -> set_message("Invalid Credentials, Try Again");
        }
    }
    return $response;
}



?>