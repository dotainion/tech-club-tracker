<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use tools\SecurityTools;

class CreateGoogleCredentialService extends Service{
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct(false);
        $this->secure = new SecurityTools();
    }
    
    public function process($id){

        $serivce = $this->secure->createGoogleCredential($id);

        return $this->mergeOutput($serivce);
    }
}