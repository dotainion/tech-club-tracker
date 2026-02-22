<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use tools\security\Session;
use tools\SecurityTools;

class GoogleLoginService extends Service{
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct(false);
        $this->secure = new SecurityTools();
    }
    
    public function process($accessToken){
        
        $this->secure->googleLogin($accessToken);
        
        return $this->setOutput(Session::user());
    }
}