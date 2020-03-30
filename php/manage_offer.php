<?php
include_once 'db.php';

$clave_grupo = $_GET['clave_grupo'];
echo getOffers($clave_grupo);

//Obtiene las materias y los maestros que imparten las materias con el semestre y carrera al
//cual pertenece el grupo apartir de la clave del grupo

function getOffers($clave_grupo){
    $dbconnection = establishConnectionDB();
    $offerta_materias = $dbconnection->query("
    SELECT materia.clave_materia, materia.nombre_materia, maestro.clave_maestro, maestro.nombre_maestro FROM grupo 
    JOIN malla_curricular ON malla_curricular.clave_carrera = grupo.clave_carrera
    JOIN oferta ON oferta.clave_materia = malla_curricular.clave_materia
    JOIN materia ON materia.clave_materia = oferta.clave_materia
    JOIN maestro ON maestro.clave_maestro = oferta.clave_maestro
    WHERE grupo.clave_grupo =:clave_grupo  AND malla_curricular.semestre = grupo.semestre
    ",[
        ":clave_grupo"=>$clave_grupo
    ])->fetchAll();

    $aulas = $dbconnection->select(
        "aula",
        [
            "clave_aula",
            "descripcion"
        ]
    );

    $response = array(
        'maestro_materia' => $offerta_materias,
        'aulas' => $aulas
    );

    return json_encode($response);
}

?>