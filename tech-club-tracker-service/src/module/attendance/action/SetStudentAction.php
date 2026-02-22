<?php
namespace src\module\attendance\action;

use src\module\attendance\service\SetStudentService;
use tools\infrastructure\IAction;
use tools\infrastructure\Request;

class SetStudentAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetStudentService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('studentId'),
            $this->get('schoolId'),
            $this->get('firstName'),
            $this->get('lastName'),
            $this->get('email'),
            $this->get('contact'),
            $this->get('gender'),
            $this->get('dob'),
            $this->get('grade'),
            $this->get('status'),
            $this->get('hide'),
            $this->get('studentLinks')
        );
    }
}