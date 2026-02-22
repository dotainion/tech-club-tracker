<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use tools\security\Session;
use tools\SecurityTools;

class LoginService extends Service{
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct(false);
        $this->secure = new SecurityTools();
    }
    
    public function process($email, $phone, $password){
        $this->secure->signIn((string)$email, (string)$phone, $password);
        return $this->setOutput(Session::user());
    }
}