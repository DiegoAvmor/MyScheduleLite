<?php
include_once 'db.php';
include 'model/SimpleResponse.php';
include 'model/MobileScheduleResponse.php';

$student_group_id = $_GET['group_id'];
$day = $_GET['day'];

if(isset($student_group_id) && isset($day)){
    $response = getStudentScheduleOfDay($student_group_id,$day);
    echo $response;
}else{
    echo new SimpleResponse(400,"Bad Request");
}


function getStudentScheduleOfDay($group_id,$day){
    $dbconnection= establishConnectionDB();
    $response = new SimpleResponse(403,"Oops, Something Went Wrong");
    $horarios_alumno = $dbconnection->select("horario",[
        "[<]materia"=>["clave_materia" => "clave_materia"],
        "[<]maestro"=>["clave_maestro" => "clave_maestro"]
    ],[
        "materia.nombre_materia",
        "maestro.nombre_maestro",
        "horario.clave_aula",
        "horario.hora_inicio",
        "horario.hora_termina"
    ],[
        "horario.clave_grupo" => $group_id,
        "horario.dia_semana" => $day
    ]);
    if(!$horarios_alumno){
        $response -> set_message("No Schedules Found At " . $day);
    }else{
        $response = new MobileScheduleResponse(200,"Schedules Found", $horarios_alumno);
    }
    return $response;
}

?>