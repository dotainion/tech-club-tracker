<?php
namespace src\module\school\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\school\service\SetSchoolService;

class SetSchoolAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetSchoolService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('schoolId'),
            $this->get('name'),
            $this->get('principal'),
            $this->get('status'),
            $this->get('email'),
            $this->get('contact'),
            $this->get('hide')
        );
    }
}