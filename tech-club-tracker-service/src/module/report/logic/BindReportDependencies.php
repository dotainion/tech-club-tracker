<?php
namespace src\module\report\logic;

use src\module\report\repository\FocusAreaRepository;
use src\module\school\logic\BindGroupDependencies;
use tools\infrastructure\Collector;

class BindReportDependencies{

    protected FocusAreaRepository $faRepo;

    public function __construct() {
        $this->faRepo =new FocusAreaRepository();
    }

    public function bindDependencies(Collector &$reports):Collector{
        if($reports->isEmpty()){
            return $reports;
        }
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

        $schools = new Collector();
        foreach($reports->list() as $report){
            $schools->add($report->school());
        }
        (new BindGroupDependencies())->bindDependencies($schools);
        return $reports;
    }
}