<?php
namespace src\module\attendance\service;

use src\infrastructure\NoTimeDateHelper;
use tools\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\attendance\factory\AttendanceFactory;
use src\module\attendance\logic\SetAttendance;
use tools\infrastructure\Id;

class SetAttendanceService extends Service{
    protected SetAttendance $attendance;
    protected AttendanceFactory $factory;
    protected NoTimeDateHelper $date;

    public function __construct(){
        parent::__construct(false);
        $this->attendance = new SetAttendance();
        $this->factory = new AttendanceFactory();
        $this->date = new NoTimeDateHelper();
    }
    
    public function process($attendanceId, $studentId, $groupId, $dateValue, $hide){
        $attendanceId && Assert::validUuid($attendanceId, 'Attendance not found.');
        Assert::validUuid($studentId, 'Student not found.');
        Assert::validUuid($groupId, 'Group not found.');

        $date = $this->date->validate($dateValue);

        //if no attendanceId was passed then create a new one
        //student id is only use for updating record
        //however if updating record with attendanceId but hide is true then it will be deleted not updated
        //date will be use as the id or reference to pull existing records with the group id.
        
        $attendance = $this->factory->mapResult([
            'attendanceId' => $attendanceId ?: (new Id())->new()->toString(),
            'studentId' => $studentId,
            'groupId' => $groupId,
            'date' => $date->toString(),
            'hide' => $hide
        ]);
        
        if($attendanceId){
            $this->attendance->set($attendance);
        }else{
            $this->attendance->setByReference($attendance);
        }

        $this->setOutput($attendance);
        return $this;
    }
}