<?php
namespace src\module\attendance\action;

use src\module\attendance\service\LinkStudentService;
use tools\infrastructure\IAction;
use tools\infrastructure\Request;

class LinkStudentAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new LinkStudentService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('studentId'),
            $this->get('schoolId'),
            $this->get('groupId')
        );
    }
}