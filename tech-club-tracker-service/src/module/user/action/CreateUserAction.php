<?php
namespace src\module\user\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\user\service\CreateUserService;

class CreateUserAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new CreateUserService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('userId'),
            $this->get('firstName'),
            $this->get('lastName'),
            $this->get('email'),
            $this->get('phoneNumber'),
            $this->get('gender'),
            $this->get('password'),
            $this->get('confirmPassword'),
            $this->get('role'),
            $this->get('read'),
            $this->get('write'),
            $this->get('edit'),
            $this->get('delete')
        );
    }
}