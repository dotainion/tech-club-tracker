<?php
namespace src\module\school\logic;

use src\module\school\repository\SchoolLinkRepository;
use tools\infrastructure\Collector;

class ListSchoolLink{

    protected SchoolLinkRepository $repo;

    public function __construct() {
        $this->repo =new SchoolLinkRepository();
    }

    public function bySchoolIdArray(array $schoolIdArray):Collector{
        if(empty($schoolIdArray)){
            return new Collector();
        }
        return $this->repo->listSchoolLink([
            'schoolId' => $schoolIdArray,
        ]);
    }

    public function byUserIdArray(array $userIdArray):Collector{
        if(empty($userIdArray)){
            return new Collector();
        }
        return $this->repo->listSchoolLink([
            'schoolId' => $userIdArray,
        ]);
    }
}