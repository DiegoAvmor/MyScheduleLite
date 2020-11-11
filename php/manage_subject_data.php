<?php
include_once 'db.php';

$clave_grupo = $_GET['clave_grupo'];
echo getSubjectInfo($clave_grupo);
    
function getSubjectInfo($clave_grupo){
    $dbconnection = establishConnectionDB();
    $horario_materias = $dbconnection->select(
        "carga",
        [
            "[><]materia" => ["clave_materia" => "clave_materia"],
            "[><]grupo" => ["clave_grupo" => "clave_grupo"],
            "[><]horario" => ["clave_grupo" => "clave_grupo",
                            "clave_materia" => "clave_materia",
                            "clave_maestro" => "clave_maestro"],
            "[><]maestro" => ["clave_maestro" => "clave_maestro"]
        ],
        [
            "carga.clave_materia",
            "carga.clave_maestro",
            "maestro.nombre_maestro",
            "materia.nombre_materia",
            "horario.clave_aula",
            "horario.hora_inicio",
            "horario.hora_termina",
            "horario.dia_semana"
        ],
        [
            "grupo.clave_grupo" => $clave_grupo
        ]
    );
    return json_encode($horario_materias);
}
?>