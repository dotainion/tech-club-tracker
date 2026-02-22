<?php
namespace src\module\report\logic;

use src\module\report\objects\Report;
use src\module\report\repository\ReportRepository;

class SetReport{

    protected ReportRepository $repo;
    protected SetSummary $summary;
    protected SetFocusArea $focusArea;

    public function __construct() {
        $this->repo =new ReportRepository();
        $this->summary = new SetSummary();
        $this->focusArea = new SetFocusArea();
    }

    public function set(Report $report):void{
        $this->summary->set($report->summary());
        $this->focusArea->setCollection($report->focusAreas());
        
        $collector = $this->repo->listReports([
            'reportId' => $report->id()
        ]);
        if($report->hide()){
            $this->repo->deleteReport($report);
            return;
        }
        if($collector->hasItem()){
            $this->repo->edit($report);
            return;
        }
        $this->repo->create($report);
    }
}