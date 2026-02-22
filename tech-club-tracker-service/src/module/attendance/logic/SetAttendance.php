<?php
namespace src\module\attendance\logic;

use src\module\attendance\objects\Attendance;
use src\module\attendance\repository\AttendanceRepository;

class SetAttendance{
    protected AttendanceRepository $repo;

    public function __construct(){
        $this->repo = new AttendanceRepository();
    }

    public function set(Attendance $attendance):void{
        if($attendance->hide()){
            $this->repo->deleteAttendance($attendance);
            return;
        }
        $collector = $this->repo->listAttendance([
            'attendanceId' => $attendance->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($attendance);
            return;
        }
        $this->repo->create($attendance);
    }

    public function setByReference(Attendance $attendance):void{
        //date and group id is use as the reference to pull the records
        if($attendance->hide()){
            $this->repo->deleteAttendanceReference($attendance);
            return;
        }
        $collector = $this->repo->listAttendance([
            'date' => $attendance->date(),
            'groupId' => $attendance->groupId(),
            'studentId' => $attendance->studentId()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($attendance);
            return;
        }
        $this->repo->create($attendance);
    }
}