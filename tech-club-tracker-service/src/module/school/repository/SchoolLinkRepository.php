<?php
namespace src\module\school\repository;

use src\infrastructure\Repository;
use src\module\school\factory\SchoolLinkFactory;
use src\module\school\objects\SchoolLink;
use tools\infrastructure\Collector;

class SchoolLinkRepository extends Repository{
    protected SchoolLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new SchoolLinkFactory();
    }
    
    public function create(SchoolLink $link):void{
        $this->insert('schoolLink')
            ->column('schoolId', $this->uuid($link->schoolId()))
            ->column('userId', $this->uuid($link->userId()));
        $this->execute();
    }
    
    public function deleteSchoolLink(SchoolLink $link):void{
        $this->delete('schoolLink');
        $this->where()->eq('schoolId', $this->uuid($link->schoolId()));
        $this->where()->eq('userId', $this->uuid($link->userId()));
        $this->execute();
    }

    public function listSchoolLink(array $where = []):Collector{
        $this->select('schoolLink');

        if(isset($where['schoolId'])){
            $this->where()->eq('schoolId', $this->uuid($where['schoolId']));
        }
        if(isset($where['userId'])){
            $this->where()->eq('userId', $this->uuid($where['userId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}