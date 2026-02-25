<?php
namespace src\module\clock\logic;

use src\module\clock\objects\Clock;
use src\module\clock\repository\ClockRepository;

class SetClock{

    protected ClockRepository $repo;

    public function __construct() {
        $this->repo =new ClockRepository();
    }

    public function set(Clock $clock):void{
        if($clock->hide()){
            $this->repo->deleteClock($clock);
            return;
        }
        $collector = $this->repo->listClocks([
            'clockId' => $clock->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($clock);
            return;
        }
        $this->repo->create($clock);
    }
}