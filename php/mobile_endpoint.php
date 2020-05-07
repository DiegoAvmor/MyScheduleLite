<?php
include_once 'db.php';
include 'model/SimpleResponse.php';

$email = $_POST['email'];
$password = $_POST['password'];

if(isset($email) && isset($password)){
    $response = getUserDataInformation($email,$password);
    echo $response;
}


function getUserDataInformation($email,$password){
    $dbconnection= establishConnectionDB();
    $response = new SimpleResponse(403,"Invalid User");
    if($dbconnection->has("alumno",["email"=> $email])){ //Checamos si es alumno
        $credentials = $dbconnection->get("alumno",
        [
            "[<]usuarios"=>["email"=>"email"],
            "[<]grupo" => ["clave_grupo"=>"clave_grupo"]
        ],[
            "alumno.email",
            "alumno.nombre_alumno",
            "alumno.clave_grupo",
            "grupo.ciclo_escolar",
            "grupo.clave_carrera",
            "grupo.semestre",
            "grupo.turno",
            "usuarios.password"
        ],[
            "alumno.email" => $email
        ]);
        if($credentials['password']===$password){
            $response -> set_status(200);
            //Se establece los datos del usuario para el estudiante
            $studentData = array(
                "user_type" => "Student",
                "name" => $credentials['nombre_alumno'],
                "group" => $credentials['clave_grupo'],
                "school_cycle" => $credentials['ciclo_escolar'],
                "career" => $credentials['clave_carrera'],
                "semester" => $credentials['semestre'],
                "turn" => $credentials['turno']
            );
            $studentSchedule = getStudentSchedule($credentials["clave_grupo"],$dbconnection);
            $response -> set_message(
                array(
                    "user_data" => $studentData,
                    "schedule" => $studentSchedule
                )
            );
        }else{
            $response -> set_message("Invalid Credentials, Try Again");
        }
    }
    if($dbconnection->has("maestro",["email"=> $email])){ //Checamos si es maestro
        $credentials = $dbconnection->get("maestro",
        [
            "[<]usuarios"=>["email"=>"email"]
        ],[
            "maestro.email",
            "maestro.nombre_maestro",
            "maestro.clave_maestro",
            "usuarios.password"
        ],[
            "maestro.email" => $email
        ]);
        if($credentials['password']===$password){
            $response -> set_status(200);
            //Se establece los datos del usuario para el maestro
            $teacherData = array(
                "user_type" => "Teacher",
                "name" => $credentials['nombre_maestro']
            );
            $teacherSchedule = getTeacherSchedule($credentials['clave_maestro'],$dbconnection);
            $response -> set_message(
                array(
                    "user_data" => $teacherData,
                    "schedule" => $teacherSchedule
                )
            );
        }else{
            $response -> set_message("Invalid Credentials, Try Again");
        }
    }
    return $response;
}

function getStudentSchedule($group_id,$dbconnection){
    $horarios_alumno = $dbconnection->select("horario",[
        "[<]materia"=>["clave_materia" => "clave_materia"],
        "[<]maestro"=>["clave_maestro" => "clave_maestro"]
    ],[
        "materia.nombre_materia",
        "maestro.nombre_maestro",
        "horario.clave_aula",
        "horario.hora_inicio",
        "horario.hora_termina",
        "horario.dia_semana"
    ],[
        "horario.clave_grupo" => $group_id
    ]);
    $filtered_schedule = [];
    foreach ($horarios_alumno as $horario) {
        if (array_key_exists($horario["dia_semana"],$filtered_schedule))//Si existe el dia en el arreglo entonces, 
        {
            array_push($filtered_schedule[$horario["dia_semana"]],$horario);
        }else{ //Si no existe el dia en la semana entonces se crea la llave y se inserta el horario en dicha llave
            $filtered_schedule[$horario["dia_semana"]] = [];
            array_push($filtered_schedule[$horario["dia_semana"]],$horario);
        }
    }
    return $filtered_schedule;
}

function getTeacherSchedule($teacher_id,$dbconnection){
    $horarios_maestro = $dbconnection->select("horario",[
        "[<]materia"=>["clave_materia" => "clave_materia"]
    ],[
        "materia.nombre_materia",
        "horario.clave_aula",
        "horario.clave_grupo",
        "horario.hora_inicio",
        "horario.hora_termina",
        "horario.dia_semana"
    ],[
        "horario.clave_maestro" => $teacher_id
    ]);
    $filtered_schedule = [];
    foreach ($horarios_maestro as $horario) {
        if (array_key_exists($horario["dia_semana"],$filtered_schedule))//Si existe el dia en el arreglo entonces, 
        {
            array_push($filtered_schedule[$horario["dia_semana"]],$horario);
        }else{ //Si no existe el dia en la semana entonces se crea la llave y se inserta el horario en dicha llave
            $filtered_schedule[$horario["dia_semana"]] = [];
            array_push($filtered_schedule[$horario["dia_semana"]],$horario);
        }
    }
    return $filtered_schedule;
}

//Maestro: Nombre, Horarios [Lunes,Martes,Miercoles,Jueves,Viernes], Nombre Materia,Clave de Aula, Hora Inicio, Hora Termina , Dia semana y Clave Grupo
//Alumno: Nombre Materia, Nombre Maestro, Aula, Hora Inicio, Hora Fin, Grupo Alumno , Ciclo escolar,clave carrera, turno y semestre

/** Response Format
 * { 
 *      status : 200,
 *      message: {
 *          user_data: {
 *              user_type : Student,
 *              name : Diego Avila El Chico Cool,
 *              group: 1,
 *              school_cycle: 2019-2020,
 *              career: LIS,
 *              semester: 4,
 *              turn: Matutino
 *          },
 *          schedule: {
 *              Lunes : [
 *                 {
 *                      nombre_materia: Materia 1,
 *                      nombre_maestro: Maestro 1,
 *                      clave_aula: CC1,
 *                      hora_inicio: 8:00,
 *                      hora_termina: 9:00
 *                 },
 *              ],
 *              Martes : [],
 *              Miercoles : [{},{},{}],
 *              Jueves : [{},{}],
 *              Viernes : [{}]
 *          }
 *      }
 * }
*/


?>