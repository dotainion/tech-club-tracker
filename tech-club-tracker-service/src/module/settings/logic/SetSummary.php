<?php
namespace src\module\report\logic;

use src\module\report\objects\Summary;
use src\module\report\repository\SummaryRepository;

class SetSummary{

    protected SummaryRepository $repo;

    public function __construct() {
        $this->repo =new SummaryRepository();
    }

    public function set(Summary $summary):void{
        $collector = $this->repo->listSummary([
            'reportId' => $summary->reportId()
        ]);
        if($summary->hide()){
            $this->repo->deleteSummary($summary);
            return;
        }
        if($collector->hasItem()){
            $this->repo->edit($summary);
            return;
        }
        $this->repo->create($summary);
    }
}