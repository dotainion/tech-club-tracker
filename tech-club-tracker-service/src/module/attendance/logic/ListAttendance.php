<?php
namespace src\module\attendance\logic;

use src\infrastructure\NoTimeDateHelper;
use src\module\attendance\repository\AttendanceRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use tools\infrastructure\Request;

class ListAttendance{
    protected Request $request;
    protected NoTimeDateHelper $helper;
    protected AttendanceRepository $repo;

    public function __construct(){
        $this->request = new Request();
        $this->helper = new NoTimeDateHelper();
        $this->repo = new AttendanceRepository();
    }

    public function bySchoolId(Id $schoolId):Collector{
        return $this->bySchoolIdArray([$schoolId]);
    }

    public function bySchoolIdArray(array $schoolIdArray):Collector{
        if(empty($schoolIdArray)){
            return new Collector();
        }
        return $this->repoWhere([
            'schoolId' => $schoolIdArray,
        ]);
    }

    public function bySchoolIdArrayAndGroupIdArray(?array $schoolIdArray, ?array $groupIdArray):Collector{
        empty($schoolIdArray) && $schoolIdArray = null;
        empty($groupIdArray) && $groupIdArray = null;
        if(!$schoolIdArray && !$groupIdArray){
            return new Collector();
        }
        return $this->repoWhere([
            'schoolId' => $schoolIdArray,
            'groupId' => $groupIdArray,
        ]);
    }

    public function repoWhere(array $where):Collector{
        return $this->repo->listAttendance([
            ...$where,
            'date' => $this->request->get('date')
        ]);
    }
}
