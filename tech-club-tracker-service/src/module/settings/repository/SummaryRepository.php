<?php
namespace src\module\report\repository;

use src\infrastructure\Repository;
use src\module\report\factory\SummaryFactory;
use src\module\report\objects\Summary;
use tools\infrastructure\Collector;

class SummaryRepository extends Repository{
    protected SummaryFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new SummaryFactory();
    }
    
    public function create(Summary $summary):void{
        $this->insert('summary')
            ->column('reportId', $this->uuid($summary->id()))
            ->column('beginner', $summary->beginner())
            ->column('intermediate', $summary->intermediate())
            ->column('advanced', $summary->advanced());
        $this->execute();
    }
    
    public function edit(Summary $summary):void{
        $this->update('summary')
            ->column('beginner', $summary->beginner())
            ->column('intermediate', $summary->intermediate())
            ->column('advanced', $summary->advanced())
            ->where()->eq('reportId', $this->uuid($summary->id()));
        $this->execute();
    }
    
    public function deleteSummary(Summary $summary):void{
        $this->delete('summary')
            ->where()->eq('reportId', $this->uuid($summary->id()));
        $this->execute();
    }

    public function listSummary(array $where = []):Collector{
        $this->select('summary');

        if(isset($where['reportId'])){
            $this->where()->eq('reportId', $this->uuid($where['reportId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}