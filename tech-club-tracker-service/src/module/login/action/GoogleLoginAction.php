<?php
namespace src\module\login\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\login\service\GoogleLoginService;

class GoogleLoginAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new GoogleLoginService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('accessToken')
        );
    }
}