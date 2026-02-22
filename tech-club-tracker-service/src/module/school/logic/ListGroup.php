<?php
namespace src\module\school\logic;

use src\module\school\repository\GroupRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;

class ListGroup extends BindStudentDependencies{

    protected GroupRepository $repo;

    public function __construct() {
        parent::__construct();
        $this->repo =new GroupRepository();
    }

    public function byGroupId(Id $groupId):Collector{
        $collector = $this->repo->listGroup([
            'groupId' => $groupId,
        ]);
        return $this->bindDependencies($collector);
    }

    public function bySchoolId(Id $schoolId):Collector{
        $collector = $this->repo->listGroup([
            'schoolId' => $schoolId,
        ]);
        return $this->bindDependencies($collector);
    }

    public function byGroupIdArray(array $groupIdArray):Collector{
        if(empty($groupIdArray)){
            return new Collector();
        }
        $collector = $this->repo->listGroup([
            'groupId' => $groupIdArray,
        ]);
        return $this->bindDependencies($collector);
    }

    public function list():Collector{
        $collector = $this->repo->listGroup([]);
        return $this->bindDependencies($collector);
    }
}