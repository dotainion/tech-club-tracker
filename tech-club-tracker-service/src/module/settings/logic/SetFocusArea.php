<?php
namespace src\module\report\logic;

use src\module\report\objects\FocusArea;
use src\module\report\repository\FocusAreaRepository;
use tools\infrastructure\Collector;

class SetFocusArea{

    protected FocusAreaRepository $repo;

    public function __construct() {
        $this->repo =new FocusAreaRepository();
    }

    public function set(FocusArea $focusArea):void{
        $collector = $this->repo->listFocusArea([
            'focusAreaId' => $focusArea->id()
        ]);
        if($focusArea->hide()){
            $this->repo->deleteFocusArea($focusArea);
            return;
        }
        if($collector->hasItem()){
            $this->repo->edit($focusArea);
            return;
        }
        $this->repo->create($focusArea);
    }

    public function setCollection(Collector $collector):void{
        foreach($collector->list() as $focusArea){
            $this->set($focusArea);
        }
    }
}