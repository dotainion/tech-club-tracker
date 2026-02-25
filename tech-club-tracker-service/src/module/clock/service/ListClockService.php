<?php
namespace src\module\clock\service;

use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\clock\logic\ListClock;

class ListClockService extends Service{
    protected ListClock $clock;

    public function __construct(){
        parent::__construct();
        $this->clock = new ListClock();
    }
    
    public function process($clockId, $userId, $in, $active){
        $clockId = (new Id())->isValid($clockId) ? new Id($clockId) : null;
        $userId = (new Id())->isValid($userId) ? new Id($userId) : null;

        $collector = $this->clock->list($clockId, $userId, $in, $active);
            
        $collector->assertHasItem('No available logs.');

        $this->setOutput($collector);
        return $this;
    }
}