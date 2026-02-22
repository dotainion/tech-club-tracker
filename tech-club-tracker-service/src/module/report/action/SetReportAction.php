<?php
namespace src\module\report\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\report\service\SetReportService;

class SetReportAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetReportService();
    }

    public function execute(){
        return $this->service->process(
            //report
            $this->get('reportId'),
            $this->get('schoolId'),
            $this->get('facilitatorId'),
            $this->get('term'),
            $this->get('date'),
            $this->get('sessions'),
            $this->get('challenges'),
            $this->get('successes'),
            $this->get('hide'),
            $this->get('published'),
            //summary
            $this->get('beginner'),
            $this->get('intermediate'),
            $this->get('advanced'),
            //focus areas
            $this->get('focusAreas')
        );
    }
}