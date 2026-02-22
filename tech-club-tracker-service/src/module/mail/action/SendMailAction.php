<?php
namespace src\module\mail\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\mail\service\SendMailService;

class SendMailAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SendMailService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('subject'),
            $this->get('body'),
            $this->get('recipients'),
            $this->get('attatchments')
        );
    }
}