<?php
include_once 'db.php';
include 'model/SimpleResponse.php';
include 'model/MobileScheduleResponse.php';

header("Content-Type: application/json");

$teacher_id = $_REQUEST['teacher_id'];
$day = $_REQUEST['day'];

if(isset($teacher_id) && isset($day)){
    $response = getTeacherScheduleOfDay($teacher_id,$day);
    echo $response->get_JSON();
}else{
    $response = new SimpleResponse(400,"Bad Request");
    echo $response->get_JSON();
}


function getTeacherScheduleOfDay($teacher_id, $day){
    $dbconnection= establishConnectionDB();
    $response = new SimpleResponse(403,"Oops, Something Went Wrong");
    $horarios_maestro = $dbconnection->select("horario",[
        "[<]materia"=>["clave_materia" => "clave_materia"]
    ],[
        "materia.nombre_materia",
        "horario.clave_aula",
        "horario.clave_grupo",
        "horario.hora_inicio",
        "horario.hora_termina"
    ],[
        "horario.clave_maestro" => $teacher_id,
        "horario.dia_semana" => $day
    ]);
    if(!$horarios_maestro){
        $response -> set_message("No Schedules Found At " . $day);
    }else{
        $response = new MobileScheduleResponse(200,"Schedules Found", $horarios_maestro);
    }
    return $response;
}

?>