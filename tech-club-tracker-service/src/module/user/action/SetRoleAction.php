<?php
namespace src\module\user\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\user\service\SetRoleService;

class SetRoleAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetRoleService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('userId'),
            $this->get('role'),
            $this->get('read'), 
            $this->get('write'), 
            $this->get('edit'), 
            $this->get('delete')
        );
    }
}