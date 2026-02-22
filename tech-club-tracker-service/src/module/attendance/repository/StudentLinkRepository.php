<?php
namespace src\module\attendance\repository;

use tools\infrastructure\Id;
use src\infrastructure\Repository;
use src\module\attendance\factory\StudentLinkFactory;
use src\module\attendance\objects\StudentLink;
use tools\infrastructure\Collector;

class StudentLinkRepository extends Repository{
    protected StudentLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new StudentLinkFactory();
    }
    
    public function create(StudentLink $link):void{
        $this->insert('studentLink')        
            ->column('groupId', $this->uuid($link->groupId()))
            ->column('schoolId', $this->uuid($link->schoolId()))
            ->column('studentId', $this->uuid($link->studentId()));
        $this->execute();
    }
    
    public function deleteStudentLink(StudentLink $link):void{
        $this->delete('studentLink');
        $this->where()->eq('schoolId', $this->uuid($link->schoolId()));
        $this->where()->eq('studentId', $this->uuid($link->studentId()));
        $this->where()->eq('groupId', $this->uuid($link->groupId()));
        $this->execute();
    }

    public function listStudentLink(array $where = []):Collector{
        $this->select('studentLink');
        $this->join()->inner('group', 'groupId', 'studentLink', 'groupId');

        if(isset($where['groupId'])){
            $this->where()->eq('groupId', $this->uuid($where['groupId']));
        }
        if(isset($where['studentId'])){
            $this->where()->eq('studentId', $this->uuid($where['studentId']));
        }
        if(isset($where['schoolId'])){
            $this->where()->eq('schoolId', $this->uuid($where['schoolId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}