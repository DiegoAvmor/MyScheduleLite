<?php
include_once 'db.php';
include 'model/SimpleResponse.php';
if(isset($_POST["horario"])){
    
    $inputHor= json_decode($_POST['horario']);
    $callB = validate($inputHor); 
    $response =$callB->get_JSON();  
    echo $response;
}else{
    echo "Datos enviados al backend se encuentran vacíos.";
}

function validate($horario){
    $response= new SimpleResponse(404,"Resource not found");
    $dbconnection= establishConnectionDB();
    
    $count = $dbconnection->count("horario", [
        "clave_maestro" => $horario->clave_maestro,
        "hora_inicio"=> $horario->hora_inicio,
        "hora_termina"=> $horario->hora_termina,
        "dia_semana"=> $horario->dia_semana
        ]);  
    if(!$count){
        $response -> set_status(200);
        $response -> set_message("El horario a ingresar es válido");

    }else{
        $response -> set_status(400);
        $response -> set_message("No se pudo añadir el horario: el mismo maestro tiene coincidencias el ".$horario->dia_semana." en el horario: ".$horario->hora_inicio." a ".$horario->hora_termina.".");
    } 
    return $response;
}

















?>