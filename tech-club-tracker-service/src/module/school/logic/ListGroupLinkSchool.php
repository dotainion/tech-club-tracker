<?php
namespace src\module\school\logic;

use src\module\school\repository\GroupLinkSchoolRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;

class ListGroupLinkSchool{

    protected GroupLinkSchoolRepository $repo;

    public function __construct() {
        $this->repo =new GroupLinkSchoolRepository();
    }

    public function byGroupId(Id $groupId):Collector{
        return $this->repo->listLink([
            'groupId' => $groupId,
        ]);
    }

    public function bySchoolIdArray(array $schoolIdArray):Collector{
        if(empty($schoolIdArray)){
            return new Collector();
        }
        return $this->repo->listLink([
            'schoolId' => $schoolIdArray,
        ]);
    }

    public function byGroupIdArray(array $groupIdArray):Collector{
        if(empty($groupIdArray)){
            return new Collector();
        }
        return $this->repo->listLink([
            'groupId' => $groupIdArray,
        ]);
    }
}