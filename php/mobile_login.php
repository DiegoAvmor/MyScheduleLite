<?php
include_once 'db.php';
include 'model/MobileLoginResponse.php';
include 'model/SimpleResponse.php';

$email = $_POST['email'];
$password = $_POST['password'];

if(isset($email) && isset($password)){
    $response = getUserDataInformation($email,$password);
    echo $response;
}else{
    echo new SimpleResponse(400,"Bad Request");
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
                "name" => $credentials['nombre_alumno'],
                "group_id" => $credentials['clave_grupo'],
                "school_cycle" => $credentials['ciclo_escolar'],
                "career" => $credentials['clave_carrera'],
                "semester" => $credentials['semestre'],
                "turn" => $credentials['turno']
            );
            $response = new MobileLoginResponse(200,"Access Granted","Student",$studentData);
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
            //Se establece los datos del usuario para el maestro
            $teacherData = array(
                "name" => $credentials['nombre_maestro'],
                "teacher_id" => $credentials['clave_maestro']
            );
            $response = new MobileLoginResponse(200,"Access Granted","Teacher",$teacherData);
        }else{
            $response -> set_message("Invalid Credentials, Try Again");
        }
    }
    return $response;
}



?>