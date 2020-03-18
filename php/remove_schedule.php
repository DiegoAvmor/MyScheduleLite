<?php
include_once 'db.php';
include 'model/SimpleResponse.php';

$response = update();
echo $response -> get_JSON();

function update(){
    $dbconnection= establishConnectionDB();
    $response = new SimpleResponse(404,"Resource not founded");
    //Falta añadir sentencia SQL
    if($name){
        $response -> set_status(200);
        $response -> set_message("Llegamos bien al remove, Sir");
    }else{
        $response -> set_message("Hay problemas en el remove, Sir");
    }
    
    return $response;
}


?>