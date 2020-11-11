<?php
include_once 'db.php';
include 'model/SimpleResponse.php';

if(isset($_POST["materia"])&&isset($_POST["clave"])){
    $inputMat= json_decode($_POST['materia']);
    $inputClav=json_decode($_POST['clave']);
    $callB = update($inputMat,$inputClav);
    $resp=$callB->get_JSON();
    echo $resp;
}else{
    echo "Datos enviados al backend se encuentran vacíos.";
}

function update($materia, $clavegrp){
    $dbconnection= establishConnectionDB();
    $response = new SimpleResponse(404,"Resource not founded");
    $count = $dbconnection->count("horario", [
        "clave_materia" => $materia,
        "clave_grupo"=> $clavegrp
        ]);

    if($count){
        if($count>0){
            $check= $dbconnection->delete("horario", [
                "AND" => [
                    "clave_materia" => $materia,
                    "clave_grupo" => $clavegrp
                ]
            ]);
            if($check->rowCount()>0){
                $response -> set_status(200);
                $response -> set_message("Horario eliminado correctamente");
            }else{
                $response -> set_message("El horario no pudo ser eliminado de la BD.");
            }
        }else{
            $response -> set_message("El horario a eliminar no pudo ser encontrado en la BD");
        }

    }else{

        $response -> set_message("No encontradas coincidencias entre materia y grupo en la BD");
    }   
    
    return $response;
}


?>