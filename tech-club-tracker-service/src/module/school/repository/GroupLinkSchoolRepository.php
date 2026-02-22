<?php
namespace src\module\school\repository;

use src\infrastructure\Repository;
use src\module\school\factory\GroupLinkSchoolFactory;
use src\module\school\objects\GroupLinkSchool;
use tools\infrastructure\Collector;

class GroupLinkSchoolRepository extends Repository{
    protected GroupLinkSchoolFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new GroupLinkSchoolFactory();
    }
    
    public function create(GroupLinkSchool $link):void{
        $this->insert('groupLinkSchool')
            ->column('schoolId', $this->uuid($link->schoolId()))
            ->column('groupId', $this->uuid($link->groupId()));
        $this->execute();
    }
    
    public function deleteLink(GroupLinkSchool $link):void{
        $this->delete('groupLinkSchool');
        $this->where()->eq('schoolId', $this->uuid($link->schoolId()));
        $this->where()->eq('groupId', $this->uuid($link->groupId()));
        $this->execute();
    }

    public function listLink(array $where = []):Collector{
        $this->select('groupLinkSchool');

        if(isset($where['schoolId'])){
            $this->where()->eq('schoolId', $this->uuid($where['schoolId']));
        }
        if(isset($where['groupId'])){
            $this->where()->eq('groupId', $this->uuid($where['groupId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}