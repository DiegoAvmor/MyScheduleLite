<?php
//include 'SimpleResponse.php'; // Si se deja el include, se muere el programa
class MobileScheduleResponse extends SimpleResponse{

    private $schedule;

    public function __construct($status, $message,$schedule) {
        //Se debe llamar al constructor de la clase padre, alias el SUPER que usamos en java
        parent::__construct($status, $message);
        $this->schedule = $schedule;
    }

    public function get_JSON() {
        return json_encode(
            array(
            'status'=> $this->get_status(),
            'message'=> $this->get_message(),
            'schedule'=>$this->get_schedule()
            )
        );
    }


    public function get_schedule() {
        return $this->schedule;
    }

    public function set_schedule($schedule){
        $this->schedule = $schedule;
    }

}



?>