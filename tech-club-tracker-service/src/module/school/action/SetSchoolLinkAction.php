<?php
namespace src\module\school\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\school\service\SetSchoolLinkService;

class SetSchoolLinkAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetSchoolLinkService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('schoolId'),
            $this->get('userId'),
            $this->get('hide')
        );
    }
}