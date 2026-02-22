<?php
namespace src\module\settings\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\settings\service\FetchSettingsService;

class FetchSettingsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new FetchSettingsService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('userId'),
            $this->get('useDefaultIfSettingsNotExist')
        );
    }
}