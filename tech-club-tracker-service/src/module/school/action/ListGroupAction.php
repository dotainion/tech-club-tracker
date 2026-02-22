<?php
namespace src\module\school\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\school\service\ListGroupService;

class ListGroupAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListGroupService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('groupId'),
            $this->get('schoolId'),
            //this is to show that date can be pass down but not to the service;
            //its only being use in a logic for fetching attendance etc that is binded to the groups via the logic
            $this->get('date')
        );
    }
}