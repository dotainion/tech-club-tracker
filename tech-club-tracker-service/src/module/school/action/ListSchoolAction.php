<?php
namespace src\module\school\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\school\service\ListSchoolService;

class ListSchoolAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListSchoolService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('userId'),
            $this->get('schoolId'),
            $this->get('date')
        );
    }
}