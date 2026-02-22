<?php
namespace src\module\user\service;

use src\infrastructure\Service;
use src\module\user\logic\ListUsers;

class ListUsersService extends Service{
    protected ListUsers $list;

    public function __construct(){
        parent::__construct();
        $this->list = new ListUsers();
    }
    
    public function process(){
        $collector = $this->list->users();

        $this->setOutput($collector);
        return $this;
    }
}