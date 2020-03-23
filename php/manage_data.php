<?php
//This file is used when the main.html is onready state
//This file returns a JSON with the relations with groups and signments created
include_once 'db.php';

echo getInfo();

function getInfo(){
    $dbconnection = establishConnectionDB();
    $not_assigned = $dbconnection->select(
        "grupos",//Primero la tabla de la base de datos
        [//Joins que se tengan que hacer
            "[>]grupos_materia" => ["clave_grupo" => "clave_grupo"],
            "[><]carrera" => ["clave_carrera" => "clave_carrera"]
        ],
        [//Selecionamos las columnas que necesitemos
            "grupos.clave_grupo",
            "grupos.ciclo_escolar",
            "grupos.clave_carrera",
            "grupos.turno",
            "carrera.nombre_carrera"
        ],//Condiciones que esperamos que se cumplan
        ["grupos_materia.clave_grupo[=]" => null]
    );
    $assigned = $dbconnection->select(
        "grupos_materia",
        [
            "[><]carrera" => ["clave_carrera" => "clave_carrera"],
            "[><]materia" => ["clave_materia" => "clave_materia"],
            "[><]grupos" => ["clave_grupo" => "clave_grupo"]
        ],
        [
            "grupos_materia.clave_grupo",
            "grupos_materia.ciclo_escolar",
            "grupos_materia.clave_carrera",
            "grupos.turno",
            "carrera.nombre_carrera",
            "grupos_materia.clave_materia",
            "materia.nombre_materia",
            "materia.creditos"
        ]
    );

    return json_encode(
        array(
        'not_assigned'=> $not_assigned,
        'assigned' => $assigned
        )
    );
}

?>