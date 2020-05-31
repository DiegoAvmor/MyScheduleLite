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
    
    $count1 = $dbconnection->count("horario", [
        "clave_maestro" => $horario->clave_maestro,
        "hora_inicio"=> $horario->hora_inicio,
        "hora_termina"=> $horario->hora_termina,
        "dia_semana"=> $horario->dia_semana
        ]); 
    $count2 = $dbconnection->count("horario", [
        "clave_aula" => $horario->clave_aula,
        "hora_inicio"=> $horario->hora_inicio,
        "hora_termina"=> $horario->hora_termina,
        "dia_semana"=> $horario->dia_semana
        ]);  
    if(!$count1 && !$count2){
        $response -> set_status(200);
        $response -> set_message("El horario a ingresar es válido");

    }else{
        $response -> set_status(400);
        if($count2){
            $response -> set_message("No se pudo añadir el horario: el aula está ocupada ya  el ".$horario->dia_semana." en el horario: ".$horario->hora_inicio." a ".$horario->hora_termina.".");
        }else{
        
        $response -> set_message("No se pudo añadir el horario: el mismo maestro tiene coincidencias el ".$horario->dia_semana." en el horario: ".$horario->hora_inicio." a ".$horario->hora_termina.".");
        }
    } 
    return $response;
}

















?>