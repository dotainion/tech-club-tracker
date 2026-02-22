<?php
namespace src\module\report\repository;

use src\infrastructure\Repository;
use src\module\report\factory\ReportFactory;
use src\module\report\objects\Report;
use tools\infrastructure\Collector;

class ReportRepository extends Repository{
    protected ReportFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ReportFactory();
    }
    
    public function create(Report $report):void{
        $this->insert('report')
            ->column('reportId', $this->uuid($report->id()))
            ->column('schoolId', $this->uuid($report->schoolId()))
            ->column('facilitatorId', $this->uuid($report->facilitatorId()))
            ->column('date', $report->date())
            ->column('term', $report->term())
            ->column('sessions', $report->sessions())
            ->column('challenges', $report->challenges())
            ->column('successes', $report->successes())
            ->column('hide', $report->hide())
            ->column('published', $report->published());
        $this->execute();
    }
    
    public function edit(Report $report):void{
        $this->update('report')
            ->column('schoolId', $this->uuid($report->schoolId()))
            ->column('facilitatorId', $this->uuid($report->facilitatorId()))
            ->column('term', $report->term())
            ->column('sessions', $report->sessions())
            ->column('challenges', $report->challenges())
            ->column('successes', $report->successes())
            ->column('hide', $report->hide())
            ->column('published', $report->published())
            ->where()->eq('reportId', $this->uuid($report->id()));
        $this->execute();
    }
    
    public function deleteReport(Report $report):void{
        $this->delete('report')
            ->where()->eq('reportId', $this->uuid($report->id()));
        $this->execute();
    }

    public function listReports(array $where = []):Collector{
        $this->select('report')->alias()->column('date', 'reportDate');
        $this->join()->inner('summary', 'reportId', 'report', 'reportId');
        $this->join()->inner('school', 'schoolId', 'report', 'schoolId');
        $this->join()->inner('user', 'id', 'report', 'facilitatorId');

        if(isset($where['reportId'])){
            $this->where()->eq('reportId', $this->uuid($where['reportId']));
        }
        if(isset($where['schoolId'])){
            $this->where()->eq('schoolId', $this->uuid($where['schoolId']));
        }
        if(isset($where['facilitatorId'])){
            $this->where()->eq('facilitatorId', $this->uuid($where['facilitatorId']));
        }
        if(isset($where['published'])){
            $this->where()->eq('published', (int)$where['published']);
        }
        if(isset($where['date'])){
            //this needs to be start with: method not exist yet, so like is use...
            $this->where()->like('date', $where['date'], 'report');
        }
        if(isset($where['from']) && isset($where['to'])){
            $this->where()->between('date', $where['from'], $where['to']);
        }
        $this->pagination()->set($where);
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}