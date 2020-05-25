<?php
include_once 'db.php';
include 'model/SimpleResponse.php';
if(isset($_POST["horario"])){
    
    $inputHor= json_decode($_POST['horario']);
    $callB = validate($inputHor); 
    $response =json_encode($callB);  
    echo $response;
}else{
    echo "Datos enviados al backend se encuentran vacíos.";
}

function validate($horario){

    $dbconnection= establishConnectionDB();
    $response = False;
    $count = $dbconnection->count("horario", [
        "clave_maestro" => $horario->clave_maestro,
        "hora_inicio"=> $horario->hora_inicio,
        "hora_termina"=> $horario->hora_termina,
        "dia_semana"=> $horario->dia_semana
        ]);  
    if(!$count){

            $response= True;
    }else{
        echo("No se pudo añadir el horario: el mismo maestro tiene coincidencias en la misma hora y día de la semana.");
        $response=False;
    } 
    return $response;
}

















?>