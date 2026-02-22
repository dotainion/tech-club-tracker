<?php
namespace src\module\school\repository;

use src\infrastructure\Repository;
use src\module\school\factory\GroupFactory;
use src\module\school\objects\Group;
use tools\infrastructure\Collector;

class GroupRepository extends Repository{
    protected GroupFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new GroupFactory();
    }
    
    public function create(Group $group):void{
        $this->insert('group')
            ->column('groupId', $this->uuid($group->id()))
            ->column('name', $group->name())
            ->column('description', $group->description());
        $this->execute();
    }
    
    public function edit(Group $group):void{
        $this->update('group')
            ->column('name', $group->name())
            ->column('description', $group->description())
            ->where()->eq('groupId', $this->uuid($group->id()));
        $this->execute();
    }
    
    public function deleteGroup(Group $group):void{
        $this->delete('group')
            ->where()->eq('groupId', $this->uuid($group->id()));
        $this->execute();
    }

    public function listGroup(array $where = []):Collector{
        $this->select('group');
        
        if(isset($where['schoolId'])){
            $this->join()->inner('groupLinkSchool', 'groupId', 'group', 'groupId');
            $this->where()->eq('schoolId', $this->uuid($where['schoolId']), 'groupLinkSchool');
        }
        if(isset($where['groupId'])){
            $this->where()->eq('groupId', $this->uuid($where['groupId']));
        }
        if(isset($where['name'])){
            $this->where()->like('name', $where['name']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}