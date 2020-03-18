<?php
/*
Este es un archivo temporal para administrar la información, para que sea más facil 
la parte de las pruebas a la base de datos
*/
include_once 'db.php';
include 'model/SimpleResponse.php';

//$name = $_POST['name'];
//$response = insert($name);
//$response = getInfo();
//echo $response;

function getInfo(){
    $dbconnection = establishConnectionDB();
    
    $raw_groups = $dbconnection->select("grupos", "*");
    $raw_subjects = $dbconnection->select("materia", "*");
    $processed_data = json_encode(
        array(
        'groups'=> $raw_groups,
        'subjects'=> $raw_subjects
        )
    );
    
    return $processed_data;
}

function insert($name){
    $dbconnection = establishConnectionDB();
    //Falta añadir sentencia SQL
    for ($i=0; $i < 20; $i++) { 
        $clave_mat = $i;
        $dbconnection->insert('materia',[
            'clave_materia' => $clave_mat,
            'nombre_materia' => $name.$i,
            'creditos' => $clave_mat,
        ]); 
    }
    
    return "Yei";
}
?>