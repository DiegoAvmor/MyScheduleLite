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
            $response -> set_message( $studentData );
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
                "name" => $credentials['nombre_maestro'],
                "teacher_id" => $credentials['clave_maestro']
            );
            $response -> set_message($teacherData);
        }else{
            $response -> set_message("Invalid Credentials, Try Again");
        }
    }
    return $response;
}



?>