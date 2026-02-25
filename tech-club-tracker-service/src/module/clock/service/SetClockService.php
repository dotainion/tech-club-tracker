<?php
namespace src\module\clock\service;

use tools\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\clock\factory\ClockFactory;
use src\module\clock\logic\ListClock;
use src\module\clock\logic\SetClock;
use tools\infrastructure\Id;

class SetClockService extends Service{
    protected ClockFactory $factory;
    protected SetClock $clock;
    protected ListClock $list;

    public function __construct(){
        parent::__construct();
        $this->factory = new ClockFactory();
        $this->clock = new SetClock();
        $this->list = new ListClock();
    }
    
    public function process($clockId, $userId, $in, $out, $hide){
        Assert::validUuid($userId, 'User not found.');

        $clockId = (new Id())->isValid($clockId) ? new Id($clockId) : (new Id())->new();

        $clock = $this->factory->mapResult([
            'clockId' => $clockId->toString(),
            'userId' => $userId,
            'in' => $in,
            'out' => $out,
            'hide' => $hide
        ]);

        if($clock->out()){
            $collector = $this->list->byId($clock->id());
            $collector->assertHasItem('You have not clocked in yet.');
        }else{
            $collector = $this->list->active();
            $collector->assertItemNotExist('You have not clocked out yet.');
        }

        $this->clock->set($clock);
        
        $this->setOutput($clock);
        return $this;
    }
}