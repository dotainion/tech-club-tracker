<?php
namespace src\module\user\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\user\service\SetAddressService;

class SetAddressAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetAddressService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('country'),
            $this->get('state'),
            $this->get('address'),
            $this->get('apt'),
            $this->get('zip')
        );
    }
}