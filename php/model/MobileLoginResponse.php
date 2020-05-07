<?php
//include 'SimpleResponse.php';// Si se deja el include, se muere el programa
class MobileLoginResponse extends SimpleResponse{

    private $user_type;
    private $data;

    public function __construct($status, $message,$user_type,$data) {
        //Se debe llamar al constructor de la clase padre, alias el SUPER que usamos en java
        parent::__construct($status, $message);
        $this->user_type = $user_type;
        $this->data = $data;
    }

    public function get_JSON() {
        return json_encode(
            array(
            'status'=> $this->get_status(),
            'message'=> $this->get_message(),
            'user_type'=>$this->get_userType(),
            'data'=>$this->get_data()
            )
        );
    }


    public function get_data() {
        return $this->data;
    }

    public function set_data($data){
        $this->data = $data;
    }

    public function get_userType() {
        return $this->user_type;
    }

    public function set_userType($user_type){
        $this->user_type = $user_type;
    }

}

?>