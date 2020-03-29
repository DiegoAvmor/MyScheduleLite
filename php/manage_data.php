<?php
//This file is used when the main.html is onready state
//This file returns a JSON with the relations with groups and signments created
include_once 'db.php';

echo getInfo();

function getInfo(){
    $dbconnection = establishConnectionDB();
    $groups = $dbconnection->select(
        "grupo",
        [//Joins que se tengan que hacer
            "[><]carrera" => ["clave_carrera" => "clave_carrera"]
        ],
        [
            "grupo.clave_grupo",
            "grupo.numero_grupo",
            "grupo.ciclo_escolar",
            "grupo.clave_carrera",
            "grupo.turno",
            "grupo.semestre",
            "grupo.clave_carrera",
            "carrera.nombre_carrera"
        ]
    );
    $array_grupos = [];
    foreach ($groups as $group) {
        $clave_grupo = $group['clave_grupo'];
        $materias = $dbconnection->select(
            "carga",
            [
                "[><]materia" => ["clave_materia" => "clave_materia"],
                "[<]grupo" => ["clave_grupo" => "clave_grupo"]
            ],
            [
                "carga.clave_materia",
                "carga.clave_grupo",
                "materia.nombre_materia"
            ],
            [
                "grupo.clave_grupo" => $clave_grupo
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