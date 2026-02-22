<?php
namespace src\module\report\service;

use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\report\logic\ListReports;

class ListReportService extends Service{
    protected ListReports $report;

    public function __construct(){
        parent::__construct();
        $this->report = new ListReports();
    }
    
    public function process($reportId, $schoolId, $facilitatorId, $published){
        $reportId = (new Id())->isValid($reportId) ? new Id($reportId) : null;
        $schoolId = (new Id())->isValid($schoolId) ? new Id($schoolId) : null;
        $facilitatorId = (new Id())->isValid($facilitatorId) ? new Id($facilitatorId) : null;

        $collector = $this->report->list(
            $reportId,
            $schoolId,
            $facilitatorId,
            $published
        );
            
        $collector->assertHasItem('No available report.');

        $this->setOutput($collector);
        return $this;
    }
}