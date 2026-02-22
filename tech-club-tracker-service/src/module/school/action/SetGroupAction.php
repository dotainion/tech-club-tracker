<?php
namespace src\module\school\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\school\service\SetGroupService;

class SetGroupAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetGroupService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('groupId'),
            $this->get('name'),
            $this->get('description'),
            $this->get('hide'),
            $this->get('forceDelete')
        );
    }
}