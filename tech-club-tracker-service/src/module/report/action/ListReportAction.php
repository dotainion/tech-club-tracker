<?php
namespace src\module\report\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\report\service\ListReportService;

class ListReportAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListReportService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('reportId'),
            $this->get('schoolId'),
            $this->get('facilitatorId'),
            $this->get('published')
        );
    }
}