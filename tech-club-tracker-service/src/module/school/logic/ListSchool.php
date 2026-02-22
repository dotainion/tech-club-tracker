<?php
namespace src\module\school\logic;

use src\module\school\repository\SchoolRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;

class ListSchool extends BindGroupDependencies{

    protected SchoolRepository $repo;

    public function __construct() {
        parent::__construct();
        $this->repo =new SchoolRepository();
    }

    public function byId(Id $schoolId):Collector{
        $collector = $this->repo->listSchool([
            'schoolId' => $schoolId,
        ]);
        return $this->bindDependencies($collector);
    }

    public function byUserId(Id $userId):Collector{
        return $this->byUserIdArray([$userId]);
    }

    public function byUserIdArray(array $userIdArray):Collector{
        if(empty($userIdArray)){
            return new Collector();
        }
        $collector = $this->repo->listSchool([
            'userId' => $userIdArray,
        ]);
        return $this->bindDependencies($collector);
    }

    public function list():Collector{
        $collector = $this->repo->listSchool([]);
        return $this->bindDependencies($collector);
    }
}