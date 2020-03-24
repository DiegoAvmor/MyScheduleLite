<?php
//This file is used when the main.html is onready state
//This file returns a JSON with the relations with groups and signments created
include_once 'db.php';

echo getInfo();

function getInfo(){
    $dbconnection = establishConnectionDB();
    $groups = $dbconnection->select(
        "grupos",//Primero la tabla de la base de datos
        [//Joins que se tengan que hacer
            "[><]carrera" => ["clave_carrera" => "clave_carrera"]
        ],
        [//Selecionamos las columnas que necesitemos
            "grupos.clave_grupo",
            "grupos.ciclo_escolar",
            "grupos.clave_carrera",
            "grupos.turno",
            "carrera.nombre_carrera"
        ]
    );
    $array_grupos = [];
    foreach ($groups as $group) {
        $clave_grupo = $group['clave_grupo'];
        $materias = $dbconnection->select(
            "grupos_materia",
            [
                "[><]carrera" => ["clave_carrera" => "clave_carrera"],
                "[><]materia" => ["clave_materia" => "clave_materia"]
            ],
            [
                "carrera.nombre_carrera",
                "materia.nombre_materia",
                "materia.creditos",
                "materia.clave_materia"
            ]
            ,
            [
                "clave_grupo" => $clave_grupo
            ]
        );
        $array_grupo_materias = array(
            'grupo' => $group,
            'materias' => isset($materias)?$materias:NULL
        );
        array_push($array_grupos,$array_grupo_materias);
    }
    return json_encode($array_grupos);
}

?>