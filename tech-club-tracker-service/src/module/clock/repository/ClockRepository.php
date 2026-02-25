<?php
namespace src\module\clock\repository;

use src\infrastructure\Repository;
use src\module\clock\factory\ClockFactory;
use src\module\clock\objects\Clock;
use tools\infrastructure\Collector;

class ClockRepository extends Repository{
    protected ClockFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ClockFactory();
    }
    
    public function create(Clock $clock):void{
        $this->insert('clock')
            ->column('clockId', $this->uuid($clock->id()))
            ->column('userId', $this->uuid($clock->userId()))
            ->column('in', $clock->in());
        $clock->out() && $this->column('out', $clock->out());
        $this->execute();
    }
    
    public function edit(Clock $clock):void{
        $this->update('clock')
            ->column('userId', $this->uuid($clock->userId()))
            ->column('in', $clock->in())
            ->column('out', $clock->out())
            ->where()->eq('clockId', $this->uuid($clock->id()));
        $this->execute();
    }
    
    public function deleteClock(Clock $clock):void{
        $this->delete('clock')
            ->where()->eq('userId', $this->uuid($clock->id()));
        $this->execute();
    }

    public function listClocks(array $where = []):Collector{
        $this->select('clock');

        if(isset($where['clockId'])){
            $this->where()->eq('clockId', $this->uuid($where['clockId']));
        }
        if(isset($where['userId'])){
            $this->where()->eq('userId', $this->uuid($where['userId']));
        }
        if(isset($where['in'])){
            $this->where()->like('in', $where['in']);
        }
        if(isset($where['out'])){
            $this->where()->like('out', $where['out']);
        }
        if(isset($where['active'])){
            $this->where()->isNull('out');
        }
        if(isset($where['from']) && isset($where['to'])){
            $this->where()->between('in', $where['from'], $where['to']);
        }
        $this->pagination()->set($where);
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}