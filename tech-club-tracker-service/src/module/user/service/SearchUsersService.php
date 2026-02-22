<?php
namespace src\module\user\service;

use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\user\logic\ListUsers;

class SearchUsersService extends Service{
    protected ListUsers $list;

    public function __construct(){
        parent::__construct();
        $this->list = new ListUsers();
    }
    
    public function process($value){
        $value = trim($value);
        if((new Id())->isValid($value)){
            $collector = $this->list->usersByIdArray([new Id($value)]);
        }else{
            $collector = $this->list->byName($value);
        }

        $this->setOutput($collector);
        return $this;
    }
}