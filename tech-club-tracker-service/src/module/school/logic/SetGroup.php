<?php
namespace src\module\school\logic;

use InvalidArgumentException;
use src\module\school\objects\Group;
use src\module\school\repository\GroupRepository;
use tools\infrastructure\Request;

class SetGroup{

    protected GroupRepository $repo;

    public function __construct() {
        $this->repo =new GroupRepository();
    }

    public function set(Group $group):void{
        $collector = $this->repo->listGroup([
            'name' => $group->name()
        ]);
        if($collector->hasItem() && $collector->first()->id()->toString() !== $group->id()->toString()){
            throw new InvalidArgumentException('Group already exist with the same name.');
        }
        $collector = $this->repo->listGroup([
            'groupId' => $group->id()
        ]);
        if($group->hide()){
            $this->assertSafeDelete($group);
            $this->repo->deleteGroup($group);
            return;
        }
        if($collector->hasItem()){
            $this->repo->edit($group);
            return;
        }
        $this->repo->create($group);
    }

    public function assertSafeDelete(Group $group):bool{
        if((new Request())->get('forceDelete')){
            return true;
        }
        $collector = (new ListGroupLinkSchool())->byGroupId($group->id());
        $collector->assertHasItem('This group is link with other records. Are you sure you want to delete this id?');
        return true;
    }
}