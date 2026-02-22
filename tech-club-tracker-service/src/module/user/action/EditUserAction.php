<?php
namespace src\module\user\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\user\service\EditUserService;

class EditUserAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new EditUserService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('firstName'),
            $this->get('lastName'),
            $this->get('email'),
            $this->get('phoneNumber'),
            $this->get('gender')
        );
    }
}