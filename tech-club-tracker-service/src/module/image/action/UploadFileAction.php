<?php
namespace src\module\image\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\image\service\UploadFileService;

class UploadFileAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new UploadFileService();
    }

    public function execute(){
        return $this->service->process(
            $this->file('file'),
            $this->get('productId'),
            $this->get('default'),
            $this->get('isDocument'),
            $this->get('fileName')
        );
    }
}