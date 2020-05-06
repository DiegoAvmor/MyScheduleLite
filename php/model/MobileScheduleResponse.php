<?php
include 'model/SimpleResponse.php';
class MobileScheduleResponse extends SimpleResponse{

    private $schedule;

    public function __construct($status, $message,$schedule) {
        $this->status = $status;
        $this->message = $message;
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