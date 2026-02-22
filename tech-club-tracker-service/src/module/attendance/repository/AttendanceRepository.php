<?php
namespace src\module\attendance\repository;

use src\infrastructure\Repository;
use src\module\attendance\factory\AttendanceFactory;
use src\module\attendance\objects\Attendance;
use tools\infrastructure\Collector;

class AttendanceRepository extends Repository{
    protected AttendanceFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new AttendanceFactory();
    }
    
    public function create(Attendance $attendance):void{
        $this->insert('attendance')        
            ->column('attendanceId', $this->uuid($attendance->id()))
            ->column('studentId', $this->uuid($attendance->studentId()))
            ->column('groupId', $this->uuid($attendance->groupId()))
            ->column('date', $attendance->date());
        $this->execute();
    }
    
    public function edit(Attendance $attendance):void{
        $this->update('attendance')
            ->column('studentId', $this->uuid($attendance->studentId()))
            ->column('groupId', $this->uuid($attendance->groupId()))
            ->column('date', $attendance->date())
            ->where()->eq('attendanceId', $this->uuid($attendance->id()));
        $this->execute();
    }

    public function deleteAttendance(Attendance $attendance):void{
        $this->delete('attendance');
        $this->where()->eq('studentId', $this->uuid($attendance->id()));
        $this->execute();
    }

    public function deleteAttendanceReference(Attendance $attendance):void{
        $this->delete('attendance');
        $this->where()->eq('date', $attendance->date());
        $this->where()->eq('studentId', $this->uuid($attendance->studentId()));
        $this->where()->eq('groupId', $this->uuid($attendance->groupId()));
        $this->execute();
    }

    public function listAttendance(array $where = []):Collector{
        $this->select('attendance');
        $this->join()->inner('group', 'groupId', 'attendance', 'groupId');

        if(isset($where['attendanceId'])){
            $this->where()->eq('attendanceId', $this->uuid($where['attendanceId']));
        }
        if(isset($where['studentId'])){
            $this->where()->eq('studentId', $this->uuid($where['studentId']));
        }
        if(isset($where['groupId'])){
            $this->where()->eq('groupId', $this->uuid($where['groupId']));
        }
        if(isset($where['date'])){
            $this->where()->like('date', $where['date']);
        }
        if(isset($where['from']) && isset($where['to'])){
            $this->where()->between('date', $where['from'], $where['to']);
        }
        $this->pagination()->set($this->request()->pagination()->get());
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}