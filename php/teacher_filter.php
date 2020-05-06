<?php
include_once 'db.php';
include 'model/SimpleResponse.php';

$teacher_id = $_GET['teacher_id'];
$day = $_GET['day'];

if(isset($teacher_id) && isset($day)){
    $response = getStudentScheduleOfDay($teacher_id,$day);
    echo $response;
}else{
    echo new SimpleResponse(400,"Bad Request");
}


function getTeacherSchedule($teacher_id, $day){
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
        $response -> set_status(200);
        $response -> set_message($horarios_maestro);
    }
    return $response;
}

?>