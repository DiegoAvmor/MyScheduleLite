<?php
class SimpleResponse{

    private $status;
    private $message;

    function __construct($status, $message) {
        $this->status = $status;
        $this->message = $message;
    }

    function get_JSON() {
        return json_encode(
            array(
            'status'=> $this->get_status(),
            'message'=> $this->get_message()
            )
        );
    }


    public function get_status() {
        return $this->status;
    }

    public function set_status($status){
        $this->status = $status;
    }

    public function get_message() {
        return $this->message;
    }

    public function set_message($message){
        $this->message = $message;
    }

}


?>