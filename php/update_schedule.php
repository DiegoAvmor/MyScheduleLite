<?php
include_once 'db.php';
include 'model/SimpleResponse.php';
if(isset($_POST["horario"])&&isset($_POST["clave"])){
    $inputHor= json_decode($_POST['horario']);
    $inputClav=json_decode($_POST['clave']);
    $callB = update($inputHor,$inputClav);
    $resp=$callB->get_JSON();
    echo $resp;
}else{
    echo "Datos enviados al backend se encuentran vacíos.";
}

function update($horario,$claveGrupo){

    $dbconnection= establishConnectionDB();
    $response = new SimpleResponse(404,"Resource not found");
 
        $check=$dbconnection->insert("horario", [
            "clave_aula" => $horario->clave_aula,
            "clave_maestro" => $horario->clave_maestro,
            "clave_materia" => $horario->clave_materia,
            "clave_grupo" =>$claveGrupo,
            "hora_inicio" => $horario->hora_inicio,
            "hora_termina" => $horario->hora_termina,
            "dia_semana" => $horario->dia_semana
            ]);

        if($check->rowCount()>0){
            $response -> set_status(200);
            $response -> set_message("Horario añadido con éxito.");
        }else{
            $response -> set_message("El horario no pudo ser añadido a la BD.");
        }
        
    
    return $response;
}

?>