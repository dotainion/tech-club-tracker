<?php
namespace src\module\user\service;

use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\user\logic\FetchUser;

class FetchUserService extends Service{
    protected FetchUser $fetch;

    public function __construct(){
        parent::__construct();
        $this->fetch = new FetchUser();
    }
    
    public function process($id){
        $idObj = new Id();
        $idObj->set($id);
        
        $collector = $this->fetch->user($idObj);

        $this->setOutput($collector->first());
        return $this;
    }
}