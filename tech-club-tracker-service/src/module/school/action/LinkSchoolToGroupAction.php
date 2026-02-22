<?php
namespace src\module\school\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\school\service\LinkSchoolToGroupService;

class LinkSchoolToGroupAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new LinkSchoolToGroupService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('schoolId'),
            $this->get('groupId'),
            $this->get('hide')
        );
    }
}