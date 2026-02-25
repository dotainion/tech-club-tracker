<?php
namespace src\module\clock\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\clock\service\SetClockService;

class SetClockAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetClockService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('clockId'),
            $this->get('userId'),
            $this->get('in'),
            $this->get('out'),
            $this->get('hide')
        );
    }
}