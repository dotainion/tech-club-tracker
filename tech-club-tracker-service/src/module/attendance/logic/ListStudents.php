<?php
namespace src\module\attendance\logic;

use src\module\attendance\repository\StudentRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;

class ListStudents extends BindAttendanceDependencies{
    protected StudentRepository $repo;

    public function __construct(){
        parent::__construct();
        $this->repo = new StudentRepository();
    }

    public function bySchoolId(Id $schoolId):Collector{
        $collector = $this->bySchoolIdArray([$schoolId]);
        return $this->bindDependencies($collector);
    }

    public function byStudentId(Id $studentId):Collector{
        $collector = $this->repo->listStudents([
            'studentId' => $studentId,
        ]);
        return $this->bindDependencies($collector);
    }

    public function bySchoolIdArray(array $schoolIdArray):Collector{
        if(empty($schoolIdArray)){
            return new Collector();
        }
        $collector = $this->repo->listStudents([
            'schoolId' => $schoolIdArray,
        ]);
        return $this->bindDependencies($collector);
    }

    public function list():Collector{
        $collector = $this->repo->listStudents([]);
        return $this->bindDependencies($collector);
    }

    public function byGroupIdArray(array $groupIdArray):Collector{
        if(empty($groupIdArray)){
            return new Collector();
        }
        $collector = $this->repo->listStudents([
            'groupId' => $groupIdArray,
        ]);
        return $this->bindDependencies($collector);
    }

    public function byGroupIdArrayAndShoolIdArray(array $groupIdArray, array $schoolIdArray):Collector{
        if(empty($groupIdArray) || empty($schoolIdArray)){
            return new Collector();
        }
        $collector = $this->repo->listStudents([
            'groupId' => $groupIdArray,
            'schoold' => $schoolIdArray
        ]);
        return $this->bindDependencies($collector);
    }
}