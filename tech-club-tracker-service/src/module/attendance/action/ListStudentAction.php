<?php
namespace src\module\attendance\action;

use src\module\attendance\service\ListStudentService;
use tools\infrastructure\IAction;
use tools\infrastructure\Request;

class ListStudentAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListStudentService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('schoolId'),
            $this->get('studentId'),
            $this->get('date')
        );
    }
}