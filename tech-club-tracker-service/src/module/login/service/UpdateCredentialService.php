<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use tools\SecurityTools;

class UpdateCredentialService extends Service{
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct();
        $this->secure = new SecurityTools();
    }
    
    public function process($id, $password, $currentPassword){
        $service = $this->secure->updateCredential($id, $password, $currentPassword);

        return $this->setOutput($service);
    }
}