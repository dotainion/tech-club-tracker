<?php
namespace src\module\user\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\user\service\CreateGoogleUserService;

class CreateGoogleUserAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new CreateGoogleUserService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('accessToken'),
            $this->get('phoneNumber')
        );
    }
}