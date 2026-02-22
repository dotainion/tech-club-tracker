<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use tools\security\Session;
use tools\SecurityTools;

class LogoutService extends Service{
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct();
        $this->secure = new SecurityTools();
    }
    
    public function process(){
        $user = Session::user();
        $this->secure->signOut();
        return $this->setOutput($user);
    }
}