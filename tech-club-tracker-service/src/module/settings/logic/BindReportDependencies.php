<?php
namespace src\module\report\logic;

use src\module\report\repository\FocusAreaRepository;
use tools\infrastructure\Collector;

class BindReportDependencies{

    protected FocusAreaRepository $faRepo;

    public function __construct() {
        $this->faRepo =new FocusAreaRepository();
    }

    public function bindDependencies(Collector &$reports):Collector{
        $reports->assertHasItem('No reports.');
        $focusAreas = $this->faRepo->listFocusArea([
            'reportId' => $reports->idArray()
        ]);
        foreach($reports->list() as $report){
            foreach($focusAreas->list() as $focusArea){
                if($report->id()->toString() === $focusArea->reportId()->toString()){
                    $report->focusAreas()->add($focusArea);
                }
            }
        }
        return $reports;
    }
}