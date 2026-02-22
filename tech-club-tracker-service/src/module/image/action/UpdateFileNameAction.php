<?php
namespace src\module\image\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\image\service\UpdateFileNameService;

class UpdateFileNameAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new UpdateFileNameService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('id'),
            $this->get('fileName')
        );
    }
}