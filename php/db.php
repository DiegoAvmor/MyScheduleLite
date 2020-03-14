<?php
use Medoo\Medoo;
require '../lib/Medoo.php';


function establishConnectionDB(){
    $jsonStr = file_get_contents("../resources/dbconfig.json");
    $config = json_decode($jsonStr);
    $connection = new Medoo(
        [
        'database_type' => $config->database->type,
        'database_name' => $config->database->dbname,
        'server' => $config->database->server,
        'username' => $config->database->username,
        'password' => $config->database->password
        ]
    );
    return $connection;
}


?>