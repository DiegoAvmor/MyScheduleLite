<?php
include_once 'db.php';
include 'model/SimpleResponse.php';

$response = generate();
echo "finish";

function generate(){
    $dbconnection= establishConnectionDB();
    $raw_schedules = $dbconnection->select("horario", "*");
    $response = json_encode($raw_schedules);
    $h1 = $raw_schedules[0];
    $h2 = $raw_schedules[1];

    compareTimes($h1, $h2);
    teacherSchedule($dbconnection);
    
    return $response;
}

function compareTimes($h1 , $h2 ){
    unset($h1["clave_materia"]);
    unset($h2["clave_materia"]);

    foreach ($h1 as $key => $value) {
        $delimitersA = explode("-", $value);
        $delimitersB = explode("-", $h2[$key]);
        
        $aBottom = new DateTime($delimitersA[0]);
        $aTop = new DateTime($delimitersA[1]);
        $bBottom = new DateTime($delimitersB[0]);
        $bTop = new DateTime($delimitersB[1]);
        
        if ($aBottom != $bTop && $bBottom != $aTop) {
            if($bBottom >= $aBottom && $bBottom <= $aTop){
                echo "Horario incompatible el ". $key."\n";
            }
        }
    }
}

function teacherSchedule($dbconnection){
    //Hacer el join con medoo y desplegar los horarios
}

?>