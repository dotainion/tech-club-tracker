<?php
namespace src\module\login\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\login\service\UpdateCredentialService;

class UpdateCredentialAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new UpdateCredentialService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('password'),
            $this->get('currentPassword')
        );
    }
}